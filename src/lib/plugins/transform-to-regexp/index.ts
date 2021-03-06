import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to RegExp
 * @class TransformToRegExp
 * @plugin TransformToRegExp
 */
export class TransformToRegExp extends BasePlugin {
  public static type = RegExp;

  public type = RegExp;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): RegExp | undefined => {
    return Utils.toRegexp(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): RegExp | undefined => {
    return Utils.toRegexp(value);
  };
}
