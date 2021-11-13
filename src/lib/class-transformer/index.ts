import {
  ClassConstructor,
  ClassMirror,
  ParameterMirror,
} from '@quicker-js/class-decorator';
import { ClassOperationExecutor } from '../class-operation-executor';
import { TransformationType } from '../../enums';

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
  public plainToInstance<T extends ClassConstructor>(
    type: T,
    value: Partial<Record<keyof InstanceType<T>, any>>,
    options: { scene?: any } = {}
  ): InstanceType<T> {
    return ClassOperationExecutor.create({
      scene: options.scene,
      classTransformer: this,
      type: TransformationType.PLAIN_TO_INSTANCE,
    }).transform(type, null, value) as InstanceType<T>;
  }

  /**
   * 实例转plain
   * @param instance
   */
  public instanceToPlain(instance: any): any {
    return JSON.stringify(
      ClassOperationExecutor.create({
        classTransformer: this,
        type: TransformationType.INSTANCE_TO_PLAIN,
        scene: ClassOperationExecutor.getSceneFromValue(instance),
      }).transform(instance.constructor, null, instance),
      null,
      2
    );
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
