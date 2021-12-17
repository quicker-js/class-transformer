import {
  ClassConstructor,
  ClassMirror,
  PropertyMetadata,
  PropertyMirror,
} from '@quicker-js/class-decorator';
import { Scene, SubType } from '../../lib';

/**
 * @class PropMetadata
 */
export class PropMetadata<
  T = PropMetadataImpl | null
> extends PropertyMetadata<T> {}

export interface BasePropMetadata {
  readonly description?: string;
  readonly name?: string;
  readonly toPlainOnly?: boolean;
  readonly toInstanceOnly?: boolean;
}

export interface PropTypeMetadata extends BasePropMetadata {
  readonly type?: ClassConstructor | 'self';
  readonly scenes?: never;
  readonly transform?: never;
  readonly subTypes?: never;
}

export interface PropSceneMetadata extends BasePropMetadata {
  readonly type?: never;
  readonly scenes?: Scene[];
  readonly transform?: never;
  readonly subTypes?: never;
}

export interface PropSubTypeMetadata extends BasePropMetadata {
  readonly type?: never;
  readonly scenes?: never;
  readonly transform?: never;
  readonly subTypes?: SubType[];
}

export interface PropTransformMetadata extends BasePropMetadata {
  readonly type?: never;
  readonly scenes?: never;
  readonly transform?: (
    value: any,
    object: any,
    propertyMirror: PropertyMirror,
    classMirror: ClassMirror
  ) => any;
  readonly subTypes?: never;
}

export type PropMetadataImpl =
  | PropTypeMetadata
  | PropSceneMetadata
  | PropSubTypeMetadata
  | PropTransformMetadata;
