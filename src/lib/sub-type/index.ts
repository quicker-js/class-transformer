import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata } from '../../metadatas';

/**
 * @class SubType
 */
export class SubType<T extends {} = any> implements SubTypeImpl<T> {
  /**
   * 构造函数
   * @param type
   * @param where
   */
  public constructor(
    public readonly type: ClassConstructor<T>,
    public readonly where: Record<PropertyKey, any>
  ) {}

  private __cacheMap: Map<PropertyKey, any>;

  /**
   * where转map
   */
  public get whereMap(): Map<PropertyKey, any> {
    if (!this.__cacheMap) {
      this.__cacheMap = new Map<PropertyKey, any>();
      const ownPropertyNames = Object.getOwnPropertyNames(this.where);
      const ownPropertySymbols = Object.getOwnPropertySymbols(this.where);
      ownPropertyNames.forEach((name) =>
        this.__cacheMap.set(name, this.where[name])
      );
      ownPropertySymbols.forEach((name) =>
        this.__cacheMap.set(name, this.where)
      );
    }

    return this.__cacheMap;
  }

  /**
   * 检测是否匹配
   */
  public match(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      const strings = Object.keys(this.where);
      return (
        strings.length > 0 &&
        strings.filter((o) => this.whereMap.get(o) === value[o]).length ===
          strings.length
      );
    }
    return false;
  }

  /**
   * 创建subType
   * @param option
   */
  public static create<T extends {}>(option: SubTypeImpl<T>): SubType<T> {
    return new SubType<T>(option.type, option.where);
  }

  /**
   * 解析缓存
   */
  private static caches: Map<ClassConstructor, SubType[]> = new Map();

  /**
   * 通过对象创建
   * @param subTypes
   */
  public static from(...subTypes: SubTypeImpl[]): SubType[] {
    return subTypes.map((item) => SubType.create(item));
  }

  /**
   * 公共类型创建
   * @param types
   */
  public static fromTypes(...types: ClassConstructor[]): SubType[] {
    const subTypes: SubType[] = [];
    types.forEach((type) => {
      const caches = SubType.caches.get(type);
      if (caches) {
        subTypes.push(...caches);
      } else {
        const classMirror = ClassMirror.reflect(type);
        const metadataSubTypes: SubType[] = [];
        classMirror.allMetadata.forEach((e) => {
          if (
            e instanceof EntityMetadata &&
            e.metadata &&
            e.metadata.subTypes
          ) {
            e.metadata.subTypes.map((where: Record<PropertyKey, any>) => {
              const instance = SubType.create({
                type,
                where,
              });
              subTypes.push(instance);
              metadataSubTypes.push(instance);
            });
          }
        });
        SubType.caches.set(type, metadataSubTypes);
      }
    });
    return subTypes;
  }
}

export interface SubTypeImpl<T extends {} = any> {
  type: ClassConstructor<T>;
  where: Record<PropertyKey, any>;
}
