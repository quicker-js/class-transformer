import {
  ClassConstructor,
  ClassMirror,
  ParameterMirror,
} from '@quicker-js/class-decorator';
import { TypeMetadata } from '../../decorators';
import {
  Flag,
  FlagDiscriminator,
  SubTypeDiscriminator,
} from '../discriminator';

/**
 * @class ClassTransformer
 */
export class ClassTransformer {
  /**
   * 构造函数
   * @param option
   */
  public constructor(private option?: ClassTransformerOption) {}

  /**
   * 层级
   * @private
   */
  private level = 0;

  /**
   * 获取参数列表
   * @param targetType
   */
  private getArgumentsList<T extends {}>(
    targetType: ClassConstructor<T>
  ): any[] {
    const list: any[] = [];
    const classMirror = ClassMirror.reflect(targetType);
    classMirror.parameters.forEach((o) => {
      if (this.option && this.option.newInstanceHandler) {
        const result = this.option.newInstanceHandler(targetType, o);
        if (result) {
          list.push(result);
        } else {
          list.push(undefined);
        }
      } else {
        list.push(undefined);
      }
    });
    return list;
  }

  /**
   * 创建实例
   * @param targetType
   */
  public newInstance<T extends {}>(targetType: ClassConstructor<T>): T {
    return Reflect.construct(targetType, this.getArgumentsList(targetType));
  }

  /**
   * Array转实例Array
   * @param targetType
   * @param value
   */
  public listToInstance<
    T extends {},
    V extends Partial<Record<keyof T, any>> | Map<keyof T, any>
  >(
    targetType: ClassConstructor<T>,
    value: V[] | Set<V> | undefined
  ): T[] | Set<T> | undefined {
    if (!(Array.isArray(value) || value instanceof Set)) {
      return undefined;
    }
    const list: T[] = [];
    value.forEach((o) => {
      const instance = this.plainToInstance(targetType, o);
      if (instance) {
        list.push(instance);
      }
    });
    if (Array.isArray(value)) {
      return list;
    } else if (value instanceof Set) {
      return new Set(list);
    } else {
      return undefined;
    }
  }

  /**
   * 从Discriminator 创建列表实例
   * @param value
   * @param subTypes
   */
  public listToInstanceFromDiscriminator<
    T extends {},
    V extends Record<keyof T, any> | Map<keyof T, any>
  >(
    value: V[] | Set<V> | undefined,
    subTypes: SubTypeDiscriminator[]
  ): T[] | Set<T> | undefined {
    const list: T[] = [];
    if (!(Array.isArray(value) || value instanceof Set)) {
      return undefined;
    }

    value.forEach((o) => {
      const type = ClassTransformer.matchSubType<T>(o, subTypes);
      if (type) {
        list.push(this.plainToInstance(type, o));
      }
    });

    if (Array.isArray(value)) {
      return list;
    } else if (value instanceof Set) {
      return new Set(list);
    } else {
      return undefined;
    }
  }

  /**
   * plain 转实例
   * @param targetType
   * @param value
   * @param level
   */
  public plainToInstance<
    T extends {},
    V extends Partial<Record<keyof T, any>> | Map<keyof T, any> =
      | Partial<Record<keyof T, any>>
      | Map<keyof T, any>
  >(targetType: ClassConstructor<T>, value: V, level = 0): T {
    if (ClassTransformer.isConstructor(targetType, Number)) {
      if (isNaN(value as any)) {
        return Number.NaN as any;
      }
      return Number(value) as any;
    } else if (ClassTransformer.isConstructor(targetType, String)) {
      if (value === null || value === undefined) {
        return '' as any;
      }
      return String(value) as any;
    } else if (ClassTransformer.isConstructor(targetType, Boolean)) {
      return Boolean(value) as any;
    } else if (ClassTransformer.isConstructor(targetType, Date)) {
      if (typeof value === 'string' || typeof value === 'number') {
        return new Date(value) as any;
      }
      return undefined as any;
    } else if (ClassTransformer.isConstructor(targetType, RegExp)) {
      if (value instanceof RegExp) {
        return value as any;
      } else if (typeof value === 'string' || typeof value === 'number') {
        return new RegExp(value) as any;
      }
      return undefined as any;
    }
    const instance = this.newInstance<any>(targetType);
    const classMirror = ClassMirror.reflect(targetType);
    const propertiesMirrors = classMirror.getPropertiesMirrorsFromAll();
    propertiesMirrors.forEach((o) => {
      let designType = o.getDesignType<ClassConstructor>();
      let v: any = undefined;
      if (value instanceof Map) {
        v = value.get(o.propertyKey as keyof T);
      } else if (typeof value === 'object' && value !== null) {
        v = value[o.propertyKey as keyof V];
      }
      o.allMetadata.forEach((typeMetadata) => {
        // 只取metadata 类型为 TypeMetadata 的元数据
        if (typeMetadata instanceof TypeMetadata) {
          // 如果元数据存在
          if (typeMetadata.metadata) {
            const { flags, subTypes, type } = typeMetadata.metadata;

            if (flags) {
              const matchTargetType = ClassTransformer.matchFlagType(
                flags,
                this.option
              );

              const transformer = new ClassTransformer({
                ...this.option,
                flag: matchTargetType ? matchTargetType.subFlag : undefined,
              });

              if (matchTargetType && matchTargetType.type) {
                if (matchTargetType.designType) {
                  designType = matchTargetType.designType as any;
                }

                if (ClassTransformer.isConstructor(designType, Array)) {
                  // 设计类型为Array
                  if (Array.isArray(v)) {
                    // 数据本身为数组类型
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      v
                    );
                  } else if (v instanceof Set) {
                    // 数据为set类型
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      new Set(v)
                    );
                  } else {
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      [v]
                    );
                  }
                } else if (ClassTransformer.isConstructor(designType, Set)) {
                  // 设计类型为Set
                  if (Array.isArray(v)) {
                    // 数据本身为数组类型
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      new Set(v)
                    );
                  } else if (v instanceof Set) {
                    // 数据为set类型
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      v
                    );
                  } else {
                    instance[o.propertyKey] = transformer.listToInstance(
                      matchTargetType.type,
                      new Set([v])
                    );
                  }
                } else {
                  // 其他设计类型

                  if (Array.isArray(v)) {
                    // 如果数据为数组 则取第一条数据
                    instance[o.propertyKey] = transformer.plainToInstance(
                      matchTargetType.type,
                      v[0]
                    );
                  } else if (v instanceof Set) {
                    // 如果数据为Set 则取第一条数据
                    instance[o.propertyKey] = transformer.plainToInstance(
                      matchTargetType.type,
                      Array.from(v.values())[0]
                    );
                  } else {
                    instance[o.propertyKey] = transformer.plainToInstance(
                      matchTargetType.type,
                      v
                    );
                  }
                }
              } else {
                const classTransformer = new ClassTransformer({
                  ...this.option,
                  flag: undefined,
                });
                instance[o.propertyKey] = classTransformer.plainToInstance(
                  designType,
                  v
                );
              }
            } else if (subTypes) {
              const transformer = new ClassTransformer({
                ...this.option,
                flag: undefined,
              });
              // 如果设计类型为 Set
              if (ClassTransformer.isConstructor(designType, Array)) {
                // 如果设计类型为Array
                if (v instanceof Set) {
                  // 数据类型为Set
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator(
                      Array.from(v),
                      subTypes
                    );
                } else if (Array.isArray(v)) {
                  // 数据类型为Array
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator(v, subTypes);
                } else {
                  // 其他默认处理为数组
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator([v], subTypes);
                }
              } else if (ClassTransformer.isConstructor(designType, Set)) {
                // 如果设计类型为Array
                if (v instanceof Set) {
                  // 数据类型为Set
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator(v, subTypes);
                } else if (Array.isArray(v)) {
                  // 数据类型为Array
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator(
                      new Set(v),
                      subTypes
                    );
                } else {
                  // 其他默认处理为数组
                  instance[o.propertyKey] =
                    transformer.listToInstanceFromDiscriminator(
                      new Set([v]),
                      subTypes
                    );
                }
              } else {
                // 其他设计类型

                if (Array.isArray(v)) {
                  const data = v[0];
                  const match = ClassTransformer.matchSubType(data, subTypes);
                  if (match) {
                    instance[o.propertyKey] = transformer.plainToInstance(
                      match,
                      data
                    );
                  }
                } else if (v instanceof Set) {
                  const data = Array.from(v)[0];
                  const match = ClassTransformer.matchSubType(data, subTypes);

                  if (match) {
                    instance[o.propertyKey] = transformer.plainToInstance(
                      match,
                      data
                    );
                  }
                } else {
                  const match = ClassTransformer.matchSubType(v, subTypes);

                  if (match) {
                    instance[o.propertyKey] = transformer.plainToInstance(
                      match,
                      v
                    );
                  }
                }
              }
            } else if (type) {
              const transformer = new ClassTransformer({
                ...this.option,
                flag: undefined,
              });
              if (ClassTransformer.isConstructor(designType, Array)) {
                if (Array.isArray(v)) {
                  instance[o.propertyKey] = transformer.listToInstance(type, v);
                } else if (v instanceof Set) {
                  instance[o.propertyKey] = transformer.listToInstance(
                    type,
                    Array.from(v)
                  );
                } else {
                  instance[o.propertyKey] = transformer.listToInstance(type, [
                    v,
                  ]);
                }
              } else if (ClassTransformer.isConstructor(designType, Set)) {
                if (Array.isArray(v)) {
                  instance[o.propertyKey] = transformer.listToInstance(
                    type,
                    new Set(v)
                  );
                } else if (v instanceof Set) {
                  instance[o.propertyKey] = transformer.listToInstance(type, v);
                } else {
                  instance[o.propertyKey] = transformer.listToInstance(
                    type,
                    new Set([v])
                  );
                }
              } else {
                instance[o.propertyKey] = transformer.plainToInstance(type, v);
              }
            }
          } else if (designType) {
            // 如果用了装饰器/没有元数据/有设计类型
            instance[o.propertyKey] = new ClassTransformer({
              ...this.option,
              flag: undefined,
            }).plainToInstance(designType, v);
          } else {
            // 如果用了装饰器/没有元数据/没有设计类型
            instance[o.propertyKey] = v;
          }
        }
      });
    });
    return instance;
  }

  /**
   * 匹配Target类型
   * @param flags
   * @param option
   */
  public static matchFlagType<T extends {}>(
    flags: Map<Flag, FlagDiscriminator>,
    option?: ClassTransformerOption
  ): FlagDiscriminator<T> | undefined {
    if (option && option.flag !== undefined) {
      return flags.get(option.flag);
    }
  }

  /**
   * 判断是否为数字构造函数
   * @param target
   * @param type
   */
  public static isConstructor(target: any, type: Function): boolean {
    return target === type;
  }

  /**
   * 匹配 Discriminator 里的类型
   * @param value
   * @param subTypes
   */
  public static matchSubType<T extends {}>(
    value: Map<PropertyKey, any> | Record<PropertyKey, any>,
    subTypes: SubTypeDiscriminator[]
  ): ClassConstructor<T> | undefined {
    const find = subTypes.find((o) => {
      const allKeys = Array.from(o.whereMap.keys());
      const filters = allKeys.filter((key: any) => {
        if (value instanceof Map) {
          return o.whereMap.get(key) === value.get(key);
        } else if (typeof value === 'object' && value !== null) {
          return o.whereMap.get(key) === value[key];
        }
        return false;
      });

      return filters.length === allKeys.length;
    });

    if (find) {
      return find.type as ClassConstructor<T>;
    }
  }
}

export interface ClassTransformerOption {
  flag?: any;
  newInstanceHandler?: <T extends {}>(
    targetType: ClassConstructor<T>,
    o: ParameterMirror
  ) => any;
}
