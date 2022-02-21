import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to number
 * @class TransformToNumber
 * @plugin TransformToNumber
 */
export class TransformToNumber extends BasePlugin {
  public static type = Number;

  public type = Number;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): number | undefined => {
    return Utils.toNumber(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): number | undefined => {
    return Utils.toNumber(value);
  };
}
