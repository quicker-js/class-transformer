import { MethodMetadata, MethodMirror } from '@quicker-js/class-decorator';

/**
 * @deprecated
 * @constructor
 */
export function Method(): MethodDecorator {
  return MethodMirror.createDecorator(new MethodMetadata(null));
}
