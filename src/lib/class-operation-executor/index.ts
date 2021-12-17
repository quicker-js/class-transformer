import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { ClassTransformer } from '../class-transformer';
import { SubType } from '../sub-type';
import { TransformationType } from '../../enums';
import { PropMetadata } from '../../metadatas';
import { Scene } from '../scene';

/**
 * @class ClassOperationExecutor
 */
export class ClassOperationExecutor implements ClassOperationExecutorImpl {
  /**
   * 构造函数
   * @param scene
   * @param classTransformer
   * @param type
   */
  public constructor(
    public readonly scene: any,
    public readonly classTransformer: ClassTransformer,
    public type: TransformationType
  ) {}

  /**
   * 转换数据
   * @param targetType 转换类型
   * @param elementType 元素类型
   * @param value value值
   *
   * Map | Array | Set 必须传递elementType参数 否则无法转换
   */
  public transform<T extends {}>(
    targetType: ClassConstructor<T>,
    elementType: ClassConstructor | null,
    value: any
  ):
    | T
    | undefined
    | null
    | string
    | boolean
    | Date
    | Map<keyof T, any>
    | Set<T>
    | Array<T>
    | RegExp
    | Number
    | Promise<T> {
    if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
      if (value instanceof Set) {
        value = Array.from(value);
      }

      if (value instanceof Map) {
        const o: Record<PropertyKey, any> = {};
        value.forEach((v, k) => {
          o[k] = v;
        });
        value = o;
      }
    }

    // 如果elementType存在 则转换的类型可能是Array | Set | Map
    if (elementType) {
      const classOperationExecutor = ClassOperationExecutor.create({
        scene: undefined,
        classTransformer: this.classTransformer,
        type: this.type,
      });
      if (ClassOperationExecutor.equal(targetType, Array)) {
        if (!Array.isArray(value)) {
          // 数据类型不匹配返回空
          return undefined;
        }
        const v = value.map((o) =>
          classOperationExecutor.transform(elementType, null, o)
        );
        ClassOperationExecutor.collectionElements.set(v, elementType);
        return v;
      } else if (ClassOperationExecutor.equal(targetType, Set)) {
        if (!Array.isArray(value)) {
          // 数据类型不匹配返回空
          return undefined;
        }
        const v = new Set(
          value.map((o) =>
            classOperationExecutor.transform(elementType, null, o)
          )
        );

        ClassOperationExecutor.collectionElements.set(v, elementType);

        return v;
      } else if (ClassOperationExecutor.equal(targetType, Map)) {
        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          const map = new Map<keyof T, any>();
          Object.getOwnPropertyNames(value).forEach((key) => {
            map.set(
              key as any,
              classOperationExecutor.transform(
                elementType,
                null,
                value[key as any]
              )
            );
          });
          Object.getOwnPropertySymbols(value).forEach((key) => {
            map.set(
              key as any,
              classOperationExecutor.transform(
                elementType,
                null,
                value[key as any]
              )
            );
          });
          ClassOperationExecutor.collectionElements.set(map, elementType);
          return map;
        }
        return undefined;
      } else if (ClassOperationExecutor.equal(targetType, Promise)) {
        if (ClassOperationExecutor.isPromise(value)) {
          const p = new Promise<T>((resolve, reject) => {
            value
              .then((res: any) => {
                resolve(
                  ClassOperationExecutor.create({
                    scene: undefined,
                    classTransformer: this.classTransformer,
                    type: this.type,
                  }).transform(elementType, null, res)
                );
              })
              .catch((err: any) => reject(err));
          });
          ClassOperationExecutor.collectionElements.set(p, elementType);
          return p;
        }
      }
    }

    /// 没有元素类型 也转换 Array
    if (ClassOperationExecutor.equal(targetType, Array)) {
      if (!Array.isArray(value)) {
        return undefined;
      }
      return value;
    }

    /// 没有元素类型 也转换 Set
    if (ClassOperationExecutor.equal(targetType, Set)) {
      if (!Array.isArray(value)) {
        return undefined;
      }
      if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
        return value;
      }
      return new Set(value);
    }

    /// 没有元素类型 也转换 Map
    if (ClassOperationExecutor.equal(targetType, Map)) {
      const map = new Map();
      if (typeof value === 'object' && value !== null) {
        if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
          return value;
        }
        Object.getOwnPropertyNames(value).forEach((key) => {
          map.set(key, value[key]);
        });
        Object.getOwnPropertySymbols(value).forEach((key) => {
          map.set(key, value[key]);
        });
      } else {
        return undefined;
      }
      return map;
    }

    /**
     * bool转换
     */
    if (ClassOperationExecutor.equal(targetType, Boolean)) {
      return Boolean(value);
    }
    // 如果数据为空 后续无法处理所以直接返回
    /// 在bool之后 因为bool可以根据这些转换
    /// targetType 是Object 后续也每必要处理
    if (
      value === undefined ||
      value === null ||
      ClassOperationExecutor.equal(targetType, Object)
    ) {
      return value;
    }

    /**
     * 字符串类型
     */
    if (ClassOperationExecutor.equal(targetType, String)) {
      return ClassOperationExecutor.toString(value);
    }

    /**
     * 数组转换
     */
    if (ClassOperationExecutor.equal(targetType, Number)) {
      return ClassOperationExecutor.toNumber(value);
    }

    /**
     * 日期转换
     */
    if (ClassOperationExecutor.equal(targetType, Date)) {
      return ClassOperationExecutor.toDate(value);
    }

    /**
     * 正则转换
     */
    if (ClassOperationExecutor.equal(targetType, RegExp)) {
      return ClassOperationExecutor.toRegexp(value);
    }

    /// 后面是通过对象的映射来解析 如果value是数组后续没法处理 所以直接返空
    if (Array.isArray(value)) {
      return undefined;
    }

    /// 如果value 不是对象则返回空 无法进行后续处理
    /// 例如：将0 转换为 数组 壮 string 转换为 对象都无法转换
    if (typeof value !== 'object') {
      return undefined;
    }

    /// 针对实例的处理
    const instance =
      this.classTransformer.newInstance<Record<any, any>>(targetType);

    /// 映射元数据
    const classMirror = ClassMirror.reflect(targetType);

    /// 获取成员映射
    const propertyMirrors = classMirror.getPropertyMirrors(true);

    /// 遍历所有的成员映射
    propertyMirrors.forEach((propertyMirror) => {
      const { propertyKey, metadata } = propertyMirror;
      /// 缓存原始数据
      const originValue = instance[propertyKey as any];
      /// property的设计类型
      const designType = propertyMirror.getDesignType<ClassConstructor>();
      /// 每个成员的元数据遍历
      metadata.forEach((propMetadata) => {
        let v: any = value[propertyMirror.propertyKey];
        /// 只取PropMetadata
        if (propMetadata instanceof PropMetadata) {
          /// 如果这个装饰器有元数据
          const { metadata } = propMetadata;
          if (metadata) {
            if (metadata.type === 'self' && propMetadata.target) {
              (metadata as { type: ClassConstructor } as any).type =
                propMetadata.target.constructor;
            }
            const {
              name,
              transform,
              type,
              subTypes,
              toPlainOnly,
              toInstanceOnly,
              scenes,
            } = metadata;
            if (name) {
              // 如果有name 则按name取值处理
              v = value[name];
            }

            const isToInstanceOnly = toInstanceOnly
              ? this.type === TransformationType.PLAIN_TO_INSTANCE
              : true;

            const isToPlainOnly = toPlainOnly
              ? this.type === TransformationType.INSTANCE_TO_PLAIN
              : true;

            if (isToInstanceOnly || isToPlainOnly) {
              if (subTypes) {
                if (
                  Array.isArray(v) &&
                  ClassOperationExecutor.isCollection(designType)
                ) {
                  const isSet = ClassOperationExecutor.equal(designType, Set);
                  const values = v.map((item: any) => {
                    let v2: any = undefined;
                    subTypes.forEach((o: SubType) => {
                      if (o.match(item)) {
                        v2 = ClassOperationExecutor.create({
                          scene: undefined,
                          type: this.type,
                          classTransformer: this.classTransformer,
                        }).transform(o.type, null, item);
                      }
                    });
                    return v2;
                  });
                  if (isSet) {
                    instance[propertyKey as any] = new Set(values);
                  }
                  instance[propertyKey as any] = values;
                } else if (!ClassOperationExecutor.isCollection(designType)) {
                  subTypes.forEach((o: SubType) => {
                    if (o.match(v)) {
                      instance[propertyKey as any] =
                        ClassOperationExecutor.create({
                          scene: undefined,
                          classTransformer: this.classTransformer,
                          type: this.type,
                        }).transform(o.type, null, v);
                    }
                  });
                }
              } else if (scenes) {
                /// 如果有转换场景处理
                scenes.forEach((scene: Scene) => {
                  if (scene.value === this.scene) {
                    const classOperationExecutor =
                      ClassOperationExecutor.create({
                        scene: scene.subScene,
                        classTransformer: this.classTransformer,
                        type: this.type,
                      });

                    /// 如果scene.type类型是数组类型
                    if (ClassOperationExecutor.isCollection(scene.type)) {
                      /// 如果scene.elementType存在
                      instance[propertyKey as any] =
                        classOperationExecutor.transform(
                          scene.type,
                          scene.elementType || null,
                          v
                        );
                    } else if (
                      ClassOperationExecutor.isCollection(designType)
                    ) {
                      /// 设计类型
                      instance[propertyKey as any] =
                        classOperationExecutor.transform(
                          designType,
                          scene.type,
                          v
                        );
                    } else if (scene.type) {
                      instance[propertyKey as any] =
                        classOperationExecutor.transform(scene.type, null, v);
                    } else {
                      instance[propertyKey as any] =
                        classOperationExecutor.transform(designType, null, v);
                    }
                  }
                });
              } else if (transform) {
                /// 如果有转换函数处理
                instance[propertyKey as any] = transform(
                  v,
                  value,
                  propertyMirror,
                  classMirror
                );
              } else if (type) {
                /// 如果有转换类型处理
                if (ClassOperationExecutor.isCollection(designType)) {
                  instance[propertyKey as any] = ClassOperationExecutor.create({
                    scene: undefined,
                    classTransformer: this.classTransformer,
                    type: this.type,
                  }).transform(designType, type, v);
                } else {
                  instance[propertyKey as any] = ClassOperationExecutor.create({
                    scene: undefined,
                    classTransformer: this.classTransformer,
                    type: this.type,
                  }).transform(type, null, v);
                }
              }
            }
          } else {
            /// 这个装饰器没有元数据 按设计类型处理
            instance[propertyKey as any] = ClassOperationExecutor.create({
              scene: undefined,
              classTransformer: this.classTransformer,
              type: this.type,
            }).transform(propertyMirror.getDesignType(), null, v);
          }
        } else {
          /// 查看是否用过Prop装饰器
          const find = Array.from(propertyMirror.metadata).find(
            (o) => o instanceof PropMetadata
          );

          /// 使用过装饰器 但没有用Prop装饰器
          if (!find) {
            instance[propertyKey as any] = ClassOperationExecutor.create({
              scene: undefined,
              classTransformer: this.classTransformer,
              type: this.type,
            }).transform(designType, null, value);
          }
        }
      });

      /// 如果有原始数据 但是
      if (
        instance[propertyKey as any] === undefined &&
        originValue !== undefined
      ) {
        instance[propertyKey as any] = originValue;
      }
    });

    if (this.scene !== undefined) {
      ClassOperationExecutor.scenes.set(instance, this.scene);
    }

    return instance;
  }

  /**
   * 判断是否为Promise对象
   * @param value
   * @private
   */
  private static isPromise(value: any): boolean {
    if (value instanceof Promise) {
      return true;
    }
    return (
      typeof value === 'object' &&
      value !== null &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function' &&
      typeof value.finally === 'function'
    );
  }

  /**
   * 创建实例
   * @param option
   */
  public static create(
    option: ClassOperationExecutorImpl
  ): ClassOperationExecutor {
    return new ClassOperationExecutor(
      option.scene,
      option.classTransformer,
      option.type || TransformationType.PLAIN_TO_INSTANCE
    );
  }

  /**
   * 转换为数字
   * @param value
   */
  private static toNumber(value: any): number | null | undefined {
    if (
      value === undefined ||
      value === null ||
      typeof value === 'number' ||
      value instanceof Number
    ) {
      return value;
    } else if (!isNaN(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }

  /**
   * 转换为正则表达式
   * @param value
   */
  private static toRegexp(value: any): RegExp | undefined | null {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof String ||
      value instanceof Number
    ) {
      return new RegExp(value.toString());
    } else if (
      value === undefined ||
      value === null ||
      value instanceof RegExp
    ) {
      return value;
    }
  }

  /**
   * 转换为日期对象
   * @param value
   */
  private static toDate(value: any): Date | undefined | null {
    if (value === null || value === undefined || value instanceof Date) {
      return value;
    } else if (
      typeof value === 'string' ||
      value instanceof String ||
      !isNaN(value)
    ) {
      return new Date(value);
    }
  }

  /**
   * 转换为字符
   * @param value
   */
  private static toString(value: any): string | undefined | null {
    if (
      value === undefined ||
      value === null ||
      value instanceof String ||
      typeof value === 'string'
    ) {
      return value;
    } else if (Array.isArray(value)) {
      return JSON.stringify(value);
    } else if (value instanceof Set) {
      return JSON.stringify(Array.from(value));
    } else if (value instanceof Map) {
      const o: { [key: string]: any } = {};
      value.forEach((v, k) => {
        o[k] = v;
      });
      return JSON.stringify(o);
    } else if (value instanceof RegExp) {
      return String(value);
    } else if (value instanceof Date) {
      return value.toLocaleString();
    } else if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  /**
   * 判断是否为集合类型
   * @param targetType
   */
  public static isCollection(targetType: ClassConstructor): boolean {
    return (
      ClassOperationExecutor.equal(targetType, Array) ||
      ClassOperationExecutor.equal(targetType, Set) ||
      ClassOperationExecutor.equal(targetType, Map)
    );
  }

  /**
   * 判断是否相等
   * @param type
   * @param otherType
   */
  private static equal(type: Function, otherType: Function): boolean {
    return type === otherType;
  }

  /**
   * 从value中获取场景，一般用于plainToInstance产生的实例转换成plain
   * @param value
   * @private
   */
  public static getSceneFromValue(value: any): any {
    return this.scenes.get(value);
  }

  /**
   * 获取集合的元素类型
   * @param value
   */
  public static getTypeFormObject<T extends object>(
    value: T
  ): ClassConstructor | undefined {
    return this.collectionElements.get(value);
  }

  /**
   * 场景关系映射
   * @private
   */
  private static scenes: Map<object, string> = new Map<object, any>();

  /**
   * 集合元素类型映射
   * @private
   */
  private static collectionElements: Map<object, ClassConstructor> = new Map<
    object,
    ClassConstructor
  >();
}

export interface ClassOperationExecutorImpl {
  readonly scene?: any;
  /**
   * transformer实例
   */
  readonly classTransformer: ClassTransformer;
  /**
   * 默认 TransformationType.PLAIN_TO_CLASS
   */
  readonly type?: TransformationType;
}
