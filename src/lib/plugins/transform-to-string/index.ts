import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to string
 * @class TransformToString
 * @plugin TransformToString
 */
export class TransformToString extends BasePlugin {
  public static type = String;

  public type = String;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): String | undefined => {
    return Utils.toString(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): string => {
    return Utils.toString(value);
  };
}
