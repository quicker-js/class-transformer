import {
  ClassConstructor,
  ClassMirror,
  ParameterMirror,
} from '@quicker-js/class-decorator';
import {
  PluginConstructor,
  TransformToArray,
  TransformToBoolean,
  TransformToDate,
  TransformToFunction,
  TransformToMap,
  TransformToNumber,
  TransformToObject,
  TransformToPromise,
  TransformToRegExp,
  TransformToSet,
  TransformToString,
  TransformToSymbol,
} from '../plugins';
import { TypedConstructorType } from '../metadatas';
import { TypeMirror } from '../type-mirror';
import { TransformToJson } from '../plugins/transform-to-json';

/**
 * @class ClassTransformer
 */
export class ClassTransformer {
  private plugins: Map<
    TypedConstructorType | ClassConstructor,
    PluginConstructor
  > = new Map();

  /**
   * 构造函数
   * @param option
   */
  public constructor(private readonly option?: ClassTransformerOption) {
    this.use(
      TransformToBoolean,
      TransformToDate,
      TransformToFunction,
      TransformToString,
      TransformToSymbol,
      TransformToNumber,
      TransformToRegExp,
      TransformToObject,
      TransformToArray,
      TransformToSet,
      TransformToMap,
      TransformToPromise,
      TransformToJson
    );
  }

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
   * transform
   * @param type
   * @param elementType
   * @param value
   * @param option
   */
  public transform = <T extends {}, V = any>(
    type: ClassConstructor<T> | TypedConstructorType,
    elementType: TypeMirror | undefined,
    value: V,
    option: PlainToInstanceOptions = {}
  ): any => {
    const Plugin = this.plugins.get(type) || this.plugins.get(Object);
    if (Plugin) {
      return new Plugin(this, option.scene).transform(type, elementType, value);
    }
    return undefined;
  };

  /**
   * toPlain
   * @param type
   * @param value
   */
  public toPlain = <T = any>(
    type: TypedConstructorType | ClassConstructor,
    value: any
  ): T | undefined => {
    const Plugin = this.plugins.get(type) || this.plugins.get(Object);
    if (Plugin) {
      return new Plugin(this, undefined).toPlain(value);
    }
  };

  /**
   * transform to instance
   * @param type
   * @param value
   * @param option
   */
  public plainToInstance = <
    T extends {} = {},
    V extends Partial<Record<keyof T, any>> & { [key: string]: any } = any
  >(
    type: ClassConstructor<T>,
    value: V,
    option: PlainToInstanceOptions = {}
  ): T => {
    return this.transform(type, undefined, value, option);
  };

  /**
   * transform to instance list
   * @param type
   * @param value
   * @param option
   */
  public plainToInstanceList = <
    T extends {} = {},
    V extends Array<
      Partial<Record<keyof T, any>> & { [key: string]: any }
    > = any[]
  >(
    type: ClassConstructor<T>,
    value: V,
    option: PlainToInstanceOptions = {}
  ): T => {
    return this.transform(
      Array,
      TypeMirror.createObjectMirror(type),
      value,
      option
    );
  };

  /**
   * transform to instance set
   * @param type
   * @param value
   * @param option
   */
  public plainToInstanceSet = <
    T extends {} = {},
    V extends Array<
      Partial<Record<keyof T, any>> & { [key: string]: any }
    > = any[]
  >(
    type: ClassConstructor<T>,
    value: V,
    option: PlainToInstanceOptions = {}
  ): T => {
    return this.transform(
      Set,
      TypeMirror.createObjectMirror(type),
      value,
      option
    );
  };

  /**
   * transform to instance map
   * @param type
   * @param value
   * @param option
   */
  public plainToInstanceMap = <
    T extends {} = {},
    V extends Partial<Record<keyof T, any>> & { [key: string]: any } = any
  >(
    type: ClassConstructor<T>,
    value: V,
    option: PlainToInstanceOptions = {}
  ): T => {
    return this.transform(
      Map,
      TypeMirror.createObjectMirror(type),
      value,
      option
    );
  };

  /**
   * instance to plain
   * @param value
   */
  public instanceToPlain<V extends object = object, T = any>(
    value: V
  ): InstanceToPlainReturn<V, T> {
    if (value === null || value === undefined) {
      return value as InstanceToPlainReturn<V, T>;
    }
    return this.toPlain(
      value.constructor as any,
      value
    ) as InstanceToPlainReturn<V, T>;
  }

  /**
   * Use plugins
   */
  public use(...plugin: PluginConstructor[]): void {
    plugin.forEach((o) => {
      this.plugins.set(o.type, o);
    });
  }
}

export type InstanceToPlainReturn<V, T> = V extends undefined
  ? undefined
  : V extends boolean
  ? boolean
  : V extends number
  ? string
  : V extends null
  ? null
  : T;

export interface PlainToInstanceOptions {
  scene?: any;
}

export interface ClassTransformerOption {
  newInstanceHandler?: <T extends {}>(
    targetType: ClassConstructor<T>,
    o: ParameterMirror
  ) => any;
}
