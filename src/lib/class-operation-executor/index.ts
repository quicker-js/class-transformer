import {
  ClassConstructor,
  ClassMirror,
  PropertyMirror,
} from '@quicker-js/class-decorator';
import { ClassTransformer } from '../class-transformer';
import { PropMetadata, PropMetadataImpl } from '../../metadatas';
import { SubType } from '../sub-type';
import { TransformationType } from '../../enums';

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
    if (ClassOperationExecutor.equal(targetType, Boolean)) {
      return Boolean(value);
    } else if (value === undefined || value === null) {
      return value;
    } else if (ClassOperationExecutor.equal(targetType, String)) {
      return ClassOperationExecutor.toString(value);
    } else if (ClassOperationExecutor.equal(targetType, Date)) {
      return ClassOperationExecutor.toDate(value);
    } else if (ClassOperationExecutor.equal(targetType, RegExp)) {
      return ClassOperationExecutor.toRegexp(value);
    } else if (ClassOperationExecutor.equal(targetType, Number)) {
      return ClassOperationExecutor.toNumber(value);
    } else if (ClassOperationExecutor.equal(targetType, Object)) {
      // 如果数据 元素类型存在
      if (Array.isArray(value) && elementType) {
        return value.map((i) => this.transform(elementType, null, i));
      }
      if (value instanceof Set && elementType) {
        return new Set(
          Array.from(value).map((i) => this.transform(elementType, null, i))
        );
      }
    } else if (ClassOperationExecutor.equal(targetType, Promise)) {
      if (ClassOperationExecutor.isPromise(value)) {
        // Promise不能转换成json 所以是undefined
        if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
          return undefined;
        }
        return new Promise((resolve, reject) => {
          value
            .then((res: any) => {
              if (elementType) {
                resolve(this.transform(elementType, null, res));
              } else {
                resolve(res);
              }
            })
            .catch((err: any) => reject(err));
        });
      }
      return Promise.resolve(value);
    } else if (ClassOperationExecutor.equal(targetType, Map)) {
      if (this.type === TransformationType.PLAIN_TO_INSTANCE) {
        const map = new Map<any, any>();
        if (typeof value === 'object') {
          if (value instanceof Map) {
            value.forEach((v, k) =>
              map.set(k, elementType ? this.transform(elementType, null, v) : v)
            );
          } else {
            Object.getOwnPropertyNames(value).forEach((key) => {
              map.set(
                key,
                elementType
                  ? this.transform(elementType, null, value[key])
                  : value[key]
              );
            });
            Object.getOwnPropertySymbols(value).forEach((key) => {
              map.set(
                key,
                elementType
                  ? this.transform(elementType, null, value[key])
                  : value[key]
              );
            });
          }
        }
        return map;
      } else {
        if (value instanceof Map) {
          const o: Record<PropertyKey, any> = {};
          value.forEach((v, k) => {
            o[k] = elementType ? this.transform(elementType, null, v) : v;
          });
          return o;
        } else {
          const newVal: Record<PropertyKey, any> = {};
          Object.getOwnPropertyNames(value).forEach((key) => {
            newVal[key] = elementType
              ? this.transform(elementType, null, value[key])
              : value[key];
          });
          Object.getOwnPropertySymbols(value).forEach((key) => {
            newVal[key] = elementType
              ? this.transform(elementType, null, value[key])
              : value[key];
          });
          return Object.assign({}, newVal);
        }
      }
    } else if (ClassOperationExecutor.equal(targetType, Array)) {
      if (elementType) {
        if (Array.isArray(value)) {
          const v = value.map((o) => this.transform(elementType, null, o));
          v[ClassOperationExecutor.listInstanceName as any] = elementType;
          return v;
        } else {
          return undefined;
        }
      }
    } else if (ClassOperationExecutor.equal(targetType, Set)) {
      if (elementType) {
        if (Array.isArray(value) || value instanceof Set) {
          const v: any = new Set(
            Array.from(value).map((o) => this.transform(elementType, null, o))
          );
          v[ClassOperationExecutor.listInstanceName as any] = elementType;
          return v;
        } else {
          return undefined;
        }
      }
    } else if (Array.isArray(value)) {
      // 如果数据类型是Array 则返回undefined不予处理
      return undefined;
    }

    // 创建实例
    const instance = this.classTransformer.newInstance(targetType) as Record<
      PropertyKey,
      any
    >;

    // 优先使用elementType，数据类型有可能是map类型
    const classMirror = ClassMirror.reflect(elementType || targetType);
    classMirror.allInstanceMembers.forEach((mirror, key) => {
      if (mirror instanceof PropertyMirror) {
        mirror.allMetadata.forEach((e) => {
          const defaultValue = instance[key];
          // 有元数据
          if (e instanceof PropMetadata) {
            if (e.metadata) {
              const {
                type,
                name,
                subTypes,
                scenes,
                transform,
                toPlainOnly = false,
                toInstanceOnly = false,
              } = (e as PropMetadata<PropMetadataImpl>).metadata;

              const isToInstanceOnly = toInstanceOnly
                ? this.type === TransformationType.PLAIN_TO_INSTANCE
                : true;

              const isToPlainOnly = toPlainOnly
                ? this.type === TransformationType.INSTANCE_TO_PLAIN
                : true;

              // data值
              if (isToInstanceOnly && isToPlainOnly) {
                const data =
                  value instanceof Map
                    ? value.get(name || key)
                    : value[name || key];

                if (scenes) {
                  const find = scenes.find((flag) =>
                    flag.match(
                      this.scene !== undefined
                        ? this.scene
                        : ClassOperationExecutor.getSceneFromValue(data)
                    )
                  );

                  if (find) {
                    const _targetType = ClassOperationExecutor.parseType(
                      mirror,
                      find.type,
                      data
                    );

                    // 只有 _targetType是Array Map Set类型时才使用element参数
                    const hasElement: boolean =
                      _targetType === Array ||
                      _targetType === Map ||
                      _targetType === Set;

                    instance[key] = ClassOperationExecutor.create({
                      scene: find.subScene,
                      classTransformer: this.classTransformer,
                      type: this.type,
                    }).transform(
                      _targetType,
                      hasElement ? find.elementType || find.type : null,
                      data
                    );
                  }
                } else if (subTypes) {
                  let result: any;
                  if (
                    ClassOperationExecutor.equal(mirror.getDesignType(), Array)
                  ) {
                    if (Array.isArray(data) || data instanceof Set) {
                      result = Array.from(data).map((item) =>
                        this.handlerSubType(subTypes, item)
                      );
                    }
                  } else if (
                    ClassOperationExecutor.equal(mirror.getDesignType(), Set)
                  ) {
                    if (Array.isArray(data) || data instanceof Set) {
                      if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
                        // 转plain 始终都只能是Array 否则无法转换成json
                        result = Array.from(data).map((item) =>
                          this.handlerSubType(subTypes, item)
                        );
                      } else {
                        result = new Set(
                          Array.from(data).map((item) =>
                            this.handlerSubType(subTypes, item)
                          )
                        );
                      }
                    }
                  } else {
                    result = this.handlerSubType(subTypes, data);
                  }
                  instance[key] = result;
                } else if (transform) {
                  instance[key] = transform(
                    data || defaultValue,
                    value,
                    mirror,
                    classMirror
                  );
                } else if (type) {
                  const _targetType = ClassOperationExecutor.parseType(
                    mirror,
                    type,
                    data
                  );

                  instance[key] = ClassOperationExecutor.create({
                    scene: undefined,
                    classTransformer: this.classTransformer,
                    type: this.type,
                  }).transform(_targetType, type, data);
                }
              } else {
                instance[key] = this.transform(
                  mirror.getDesignType(),
                  null,
                  value && value[key]
                );
              }
            } else {
              instance[key] = this.transform(
                mirror.getDesignType(),
                null,
                value && value[key]
              );
            }
          }

          if (defaultValue !== undefined && instance[key] === undefined) {
            instance[key] = defaultValue;
          }
        });
      }
    });

    if (this.scene) {
      instance[ClassOperationExecutor.sceneName] = this.scene;
    }
    return instance;
  }

  /**
   * 处理子类型
   * @param subTypes
   * @param data
   */
  private handlerSubType(subTypes: SubType[], data: any): any {
    if (ClassOperationExecutor.isPromise(data)) {
      if (this.type === TransformationType.INSTANCE_TO_PLAIN) {
        // 转json不能转换Promise
        return undefined;
      }
      return new Promise((resolve, reject) => {
        data
          .then((res: any) => {
            const find = subTypes.find((subType) => subType.match(res));
            if (find) {
              resolve(
                ClassOperationExecutor.create({
                  scene: undefined,
                  classTransformer: this.classTransformer,
                  type: this.type,
                }).transform(find.type, null, res)
              );
            } else {
              resolve(undefined);
            }
          })
          .catch((err: any) => {
            reject(err);
          });
      });
    }
    // 如果使用subType来匹配类型
    const find = subTypes.find((subType) => subType.match(data));

    if (find) {
      return ClassOperationExecutor.create({
        scene: undefined,
        classTransformer: this.classTransformer,
        type: this.type,
      }).transform(find.type, null, data);
    }
  }

  /**
   * 解析类型
   * @param mirror
   * @param targetType
   * @param value
   */
  private static parseType(
    mirror: PropertyMirror,
    targetType: ClassConstructor,
    value: any
  ): ClassConstructor {
    const designType = mirror.getDesignType();

    if (
      designType === Array ||
      designType === Set ||
      designType === Map ||
      designType === Promise
    ) {
      targetType = designType as ClassConstructor;
    }

    return targetType;
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
    if (typeof value === 'object' && value !== null) {
      return value[ClassOperationExecutor.sceneName];
    }
  }

  /**
   * 场景名称
   */
  public static sceneName = Symbol('_scene');

  /**
   * 数组元素的实例名称
   */
  public static listInstanceName = Symbol('_instance');
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
