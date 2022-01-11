import { ClassTransformer } from '../../class-transformer';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';
import { TypedConstructorType } from '../../metadatas';

/**
 * @class BasePlugin
 */
export abstract class BasePlugin {
  public abstract type: TypedConstructorType;

  /**
   * constructor
   * @protected
   * @param classTransformer
   * @param scene
   */
  public constructor(
    public classTransformer: ClassTransformer,
    public scene: string | number | undefined
  ) {}

  /**
   * transform
   * @param type
   * @param elementType
   * @param value
   */
  public abstract transform<T extends {}>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): any;

  /**
   * to plain
   * @param value
   */
  public abstract toPlain(value: any): any;
}

export interface TransformPlugin {
  type: TypedConstructorType;
  classTransformer: ClassTransformer;
  scene: string | number | undefined;
  toPlain(value: any): any;
  transform<T extends {}>(
    type: ClassConstructor<T> | TypedConstructorType | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): any;
}

export interface PluginConstructor {
  new (
    classTransformer: ClassTransformer,
    scene: string | number | undefined
  ): TransformPlugin;

  type: TypedConstructorType | ClassConstructor;
}
