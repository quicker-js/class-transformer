import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata } from '../../decorators';

/**
 * @class SubTypeDiscriminator
 */
export class SubTypeDiscriminator<T extends {} = any> {
  public whereMap: Map<PropertyKey, any> = new Map();

  /**
   * 构造函数
   * @param type
   * @param where
   */
  public constructor(
    public type: ClassConstructor<T>,
    public where: Record<PropertyKey, any>
  ) {
    Object.getOwnPropertyNames(where).forEach((key) => {
      this.whereMap.set(key, where[key]);
    });
    Object.getOwnPropertySymbols(where).forEach((key) => {
      this.whereMap.set(key, where[key]);
    });
  }

  /**
   * 包含多个SubTypeDiscriminator
   */
  public static includes(
    ...options: Array<Omit<SubTypeDiscriminator, 'whereMap'> | ClassConstructor>
  ): SubTypeDiscriminator[] {
    const list: SubTypeDiscriminator[] = [];
    options.map((o) => {
      if (typeof o === 'function') {
        const classMirror = ClassMirror.reflect(o);
        classMirror.allMetadata.forEach((entity) => {
          if (
            entity instanceof EntityMetadata &&
            entity.metadata &&
            entity.metadata.includes
          ) {
            entity.metadata.includes.forEach((m: SubTypeDiscriminator) => {
              list.push(
                SubTypeDiscriminator.create({
                  type: o,
                  where: m.where,
                })
              );
            });
          }
        });
      } else {
        list.push(SubTypeDiscriminator.create(o));
      }
    });
    return list;
  }

  /**
   * 定义SubTypeDiscriminator的where
   * @param options
   */
  public static define<
    T extends Record<PropertyKey, any> = Record<PropertyKey, any>
  >(...options: T[]): Omit<SubTypeDiscriminator, 'whereMap' | 'type'>[] {
    return options.map((o) => ({
      where: o,
    }));
  }

  /**
   * 创建SubTypeDiscriminator
   * @param option
   */
  public static create<T>(
    option: Omit<SubTypeDiscriminator<T>, 'whereMap'>
  ): SubTypeDiscriminator<T> {
    return new SubTypeDiscriminator(option.type, option.where);
  }
}
