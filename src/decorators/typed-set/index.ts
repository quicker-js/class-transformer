import { ClassConstructor, PropertyMirror } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../lib';
import {
  TypedConstructorType,
  TypedMetadata,
  TypedMetadataImpl,
} from '../../lib';

/**
 * Typed set decorator
 * @param type
 * @param metadata
 * @constructor
 */
export function TypedSet(
  type?: TypeMirror | TypedConstructorType | ClassConstructor,
  metadata?: TypedMetadataImpl
): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      type ? TypeMirror.createSetMirror(type) : undefined
    )
  );
}
