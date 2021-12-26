import {
  ClassConstructor,
  ClassMirror,
  ParameterMirror,
} from '@quicker-js/class-decorator';
import { ClassOperationExecutor } from '../class-operation-executor';
import { TransformationType } from '../../enums';
import { PropMetadata } from '../../metadatas';

/**
 * @class ClassTransformer
 */
export class ClassTransformer {
  /**
   * 构造函数
   * @param option
   */
  public constructor(private readonly option?: ClassTransformerOption) {}

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
   * 转换实例
   * @param type
   * @param value
   * @param options
   */
  public plainToInstance<
    T extends {},
    V extends Record<keyof T | string | symbol, T[keyof T] | any>
  >(type: ClassConstructor<T>, value: V, options: { scene?: any } = {}): T {
    return ClassOperationExecutor.create({
      scene: options.scene,
      classTransformer: this,
      type: TransformationType.PLAIN_TO_INSTANCE,
    }).transform(type, null, value) as T;
  }

  /**
   * 实例转plain
   * @param instance
   */
  public instanceToPlain<R = any, T = any>(
    instance: T
  ): ToPlainReturnType<T, R> {
    if (
      instance === undefined ||
      instance === null ||
      instance instanceof Date ||
      instance instanceof RegExp ||
      instance instanceof Symbol ||
      instance instanceof Number ||
      instance instanceof String ||
      typeof instance === 'number' ||
      typeof instance === 'function' ||
      typeof instance === 'boolean' ||
      typeof instance === 'string'
    ) {
      return instance as ToPlainReturnType<T, R>;
    }

    if (Array.isArray(instance) || instance instanceof Set) {
      return Array.from(instance).map<R>((o) => {
        return this.instanceToPlain(o);
      }) as ToPlainReturnType<T, R>;
    }
    if (instance instanceof Map) {
      const o: Record<any, any> = {};
      instance.forEach((v, k) => {
        o[k as keyof R] = this.instanceToPlain(v);
      });
      return o as ToPlainReturnType<T, R>;
    }
    const { constructor } = instance as any;
    if (constructor) {
      const classMirror = ClassMirror.reflect(constructor);
      const newInstance: Record<any, any> = {};
      const propertyMirrors = classMirror.getPropertyMirrors(true);
      propertyMirrors.forEach((propertyMirror) => {
        const { propertyKey, metadata } = propertyMirror;
        /// 缓存原始数据
        const originValue = (instance as any)[propertyKey];
        let newValue = undefined;
        /// 每个成员的元数据遍历
        metadata.forEach((propMetadata) => {
          /// 只取PropMetadata
          if (propMetadata instanceof PropMetadata) {
            /// 如果这个装饰器有元数据
            const { metadata } = propMetadata;
            if (metadata) {
              const { name, transform } = metadata;
              if (!metadata.toPlainOnly) {
                if (typeof transform === 'function') {
                  newValue = transform(
                    originValue,
                    instance,
                    propertyMirror,
                    classMirror
                  );
                } else {
                  newValue = originValue;
                }
                newInstance[name || propertyKey] =
                  this.instanceToPlain(newValue);
              }
            }
          }
        });

        if (newValue === undefined && originValue !== undefined) {
          newInstance[propertyKey as string] = originValue;
        }
      });
      return newInstance as ToPlainReturnType<T, R>;
    }
    return undefined as ToPlainReturnType<T, R>;
  }

  /**
   * 转换为实例数组
   * @param type
   * @param value
   * @param options
   */
  public plainToInstanceList<T extends {}>(
    type: ClassConstructor<T>,
    value: Partial<Record<keyof T, any>>[],
    options: { scene?: any } = {}
  ): T[] {
    return ClassOperationExecutor.create({
      scene: options.scene,
      classTransformer: this,
      type: TransformationType.PLAIN_TO_INSTANCE,
    }).transform(Array, type, value) as T[];
  }
}

export interface ClassTransformerOption {
  newInstanceHandler?: <T extends {}>(
    targetType: ClassConstructor<T>,
    o: ParameterMirror
  ) => any;
}

export type ToPlainReturnType<T, R> = T extends
  | null
  | number
  | string
  | undefined
  | boolean
  | Number
  | Boolean
  | RegExp
  | Date
  | Function
  | Symbol
  ? T
  : T extends Set<any>
  ? R[]
  : T extends Map<any, any>
  ? Record<keyof R, R[keyof R]>
  : T extends any[]
  ? R[]
  : T;

new ClassTransformer().instanceToPlain([new ClassTransformer()]);
