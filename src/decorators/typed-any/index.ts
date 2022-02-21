import { PropertyMirror } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../lib';
import { TypedMetadata, TypedMetadataImpl } from '../../lib';
import { Any } from '../../lib/types';

/**
 * Typed any decorator
 * @param metadata
 * @constructor
 */
export function TypedAny(metadata?: TypedMetadataImpl): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      TypeMirror.createObjectMirror(Any)
    )
  );
}
