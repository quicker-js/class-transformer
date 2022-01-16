import { PropertyMetadata } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';

/**
 * 元数据
 * @class TypedMetadata
 */
export class TypedMetadata<
  T extends TypedMetadataImpl | null = any
> extends PropertyMetadata<T> {
  public readonly type = Object;

  /**
   * constructor
   * @param metadata
   * @param mirror
   */
  public constructor(metadata: T, public mirror?: TypeMirror) {
    super(metadata);
  }
}

export type TypedMetadataImpl =
  | (TypeMetadataScene & TypeMetadataToPlainOnly)
  | (TypeMetadataScene & TypeMetadataInstanceOnly)
  | (TypeMetadataTransform & TypeMetadataToPlainOnly)
  | (TypeMetadataTransform & TypeMetadataInstanceOnly);

export interface TypeMetadataToPlainOnly {
  readonly toPlainOnly?: boolean;
  readonly toInstanceOnly?: never;
}

export interface TypeMetadataInstanceOnly {
  readonly name?: string;
  readonly toPlainOnly?: never;
  readonly toInstanceOnly?: boolean;
}

export interface TypeMetadataWhere {
  readonly name?: string;
  readonly scenes?: never;
  readonly transform?: never;
}

export interface TypeMetadataScene {
  readonly name?: string;
  readonly scenes?: Scene[];
  readonly transform?: never;
}

export interface TypeMetadataTransform {
  readonly name?: string;
  readonly scenes?: never;
  readonly transform?: (
    current: any,
    values: any,
    metadata: TypedMetadata,
    allMetadata: Set<TypedMetadata>
  ) => any;
}

export interface Scene {
  value: string | number;
  subValue?: string | number;
}

export type TypedConstructorType =
  | ObjectConstructor
  | ArrayConstructor
  | SetConstructor
  | MapConstructor
  | PromiseConstructor
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | FunctionConstructor
  | SymbolConstructor
  | RegExpConstructor
  | DateConstructor
  | JSON;
