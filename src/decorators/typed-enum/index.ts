import { PropertyMirror } from '@quicker-js/class-decorator';
import { TypedMetadata, TypedMetadataEnumImpl, TypeMirror } from '../../lib';
import { EnumArray } from '../../lib';

/**
 * Typed enum decorator
 * @param metadata
 * @constructor
 */
export function TypedEnum(metadata: TypedMetadataEnumImpl): PropertyDecorator {
  return PropertyMirror.createDecorator(
    new TypedMetadata(
      metadata ? metadata : null,
      TypeMirror.createObjectMirror(EnumArray)
    )
  );
}
