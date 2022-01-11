import { ClassConstructor, PropertyMirror } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../lib';
import {
  TypedConstructorType,
  TypedMetadata,
  TypedMetadataImpl,
} from '../../lib';

/**
 * Typed promise decorator
 * @param type
 * @param metadata
 * @constructor
 */
export function TypedPromise(
  type?: TypeMirror | TypedConstructorType | ClassConstructor,
  metadata?: TypedMetadataImpl
): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      type ? TypeMirror.createPromiseMirror(type) : undefined
    )
  );
}
