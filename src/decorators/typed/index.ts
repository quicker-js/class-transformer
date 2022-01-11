import { ClassConstructor, PropertyMirror } from '@quicker-js/class-decorator';
import { TypedConstructorType, TypeMirror } from '../../lib';
import { TypedMetadata, TypedMetadataImpl } from '../../lib';

/**
 * Typed decorator
 * @param type
 * @param metadata
 * @constructor
 */
export function Typed(
  type?: TypeMirror | TypedConstructorType | ClassConstructor,
  metadata?: TypedMetadataImpl
): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      type instanceof TypeMirror
        ? type
        : type
        ? TypeMirror.createObjectMirror(type)
        : undefined
    )
  );
}
