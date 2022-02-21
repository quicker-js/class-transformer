import { ClassConstructor } from '@quicker-js/class-decorator';
import { ClassTransformer } from '../../class-transformer';
import {
  TypedConstructorType,
  TypedMetadataEnumImpl,
  TypedMetadataImpl,
} from '../../metadatas';
import { TypeMirror } from '../../type-mirror';

/**
 * @class BasePlugin
 */
export abstract class BasePlugin {
  public abstract type: TypedConstructorType | ClassConstructor;

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
   * @param metadata
   * @param value
   */
  public abstract transform<T extends {}>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): any;

  /**
   * to plain
   * @param value
   * @param metadata
   */
  public abstract toPlain(
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): any;
}

export interface TransformPlugin {
  type: TypedConstructorType | ClassConstructor;
  classTransformer: ClassTransformer;
  scene: string | number | undefined;
  toPlain(
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): any;
  transform<T extends {}>(
    type: ClassConstructor<T> | TypedConstructorType | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
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
