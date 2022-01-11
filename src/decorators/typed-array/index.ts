import { ClassConstructor, PropertyMirror } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../lib';
import {
  TypedConstructorType,
  TypedMetadata,
  TypedMetadataImpl,
} from '../../lib';

/**
 * Typed array decorator
 * @param type
 * @param metadata
 * @constructor
 */
export function TypedArray(
  type?: TypeMirror | TypedConstructorType | ClassConstructor,
  metadata?: TypedMetadataImpl
): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      type ? TypeMirror.createArrayMirror(type) : undefined
    )
  );
}
