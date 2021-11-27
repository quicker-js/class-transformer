import { PropertyMirror, PropertyMetadata } from '@quicker-js/class-decorator';

/**
 *
 * @param option
 * @constructor
 */
export function Type(): PropertyDecorator {
  return PropertyMirror.createDecorator(new TypeMetadata(null));
}

export interface TypeMetadataImpl {
  a?: string;
}

/**
 *
 */
class TypeMetadata extends PropertyMetadata<null> {}
