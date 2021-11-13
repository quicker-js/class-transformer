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
  name?: string;
  toPlainOnly?: boolean;
  toInstanceOnly?: boolean;
}

export interface PropTypeMetadata extends BasePropMetadata {
  type?: ClassConstructor;
  scenes?: never;
  transform?: never;
  subTypes?: never;
}

export interface PropSceneMetadata extends BasePropMetadata {
  type?: never;
  scenes?: Scene[];
  transform?: never;
  subTypes?: never;
}

export interface PropSubTypeMetadata extends BasePropMetadata {
  type?: never;
  scenes?: never;
  transform?: never;
  subTypes?: SubType[];
}

export interface PropTransformMetadata extends BasePropMetadata {
  type?: never;
  scenes?: never;
  transform?: (
    value: any,
    object: any,
    propertyMirror: PropertyMirror,
    classMirror: ClassMirror
  ) => any;
  subTypes?: never;
}

export type PropMetadataImpl =
  | PropTypeMetadata
  | PropSceneMetadata
  | PropSubTypeMetadata
  | PropTransformMetadata;
