import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata } from '../../decorators';

/**
 * @class FlagDiscriminator
 */
export class FlagDiscriminator<T extends {} = any> {
  /**
   * 构造函数
   * @param value value值
   * @param type 类型
   * @param designType 替换默认的 designType 暂时只支持Array 和Set
   * @param subFlag
   */
  private constructor(
    public value: any,
    public type: ClassConstructor<T>,
    public designType?: typeof Array | typeof Set,
    // | typeof String
    // | typeof Date
    // | typeof Number
    // | typeof Boolean,
    public subFlag?: SubFlag
  ) {}

  /**
   * 匹配多个
   */
  public static includes(
    ...options: Array<FlagDiscriminator | ClassConstructor>
  ): Map<Flag, FlagDiscriminator> {
    const map = new Map();
    options.forEach((o) => {
      if (typeof o === 'function') {
        const classMirror = ClassMirror.reflect(o);
        classMirror.allMetadata.forEach((entity) => {
          if (
            entity instanceof EntityMetadata &&
            entity.metadata &&
            entity.metadata.flags
          ) {
            entity.metadata.flags.forEach((flag: any, key: any) => {
              if (flag instanceof FlagDiscriminator) {
                flag.type = o;
                map.set(key, flag);
              }
            });
          }
        });
      } else {
        map.set(o.value, FlagDiscriminator.create(o));
      }
    });
    return map;
  }

  /**
   * 定义匹配器
   * @param options
   */
  public static define<T extends {} = any>(
    ...options: Array<Omit<FlagDiscriminator<T>, 'type'>>
  ): Map<any, FlagDiscriminator<T>> {
    return this.includes(...(options as any));
  }

  /**
   * 创建FlagDiscriminator
   * @param option
   */
  public static create<T extends {}>(
    option: FlagDiscriminator<T>
  ): FlagDiscriminator<T> {
    return new FlagDiscriminator<T>(
      option.value,
      option.type,
      option.designType,
      option.subFlag
    );
  }
}

export type Flag = any;
export type SubFlag = any;
