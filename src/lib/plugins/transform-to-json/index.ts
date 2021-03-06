import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to json
 * @class TransformToJson
 * @plugin TransformToJson
 */
export class TransformToJson extends BasePlugin {
  public static type = JSON;

  public type = JSON;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): string | undefined => {
    return Utils.toJSON(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): string | undefined => {
    return Utils.toJSON(value);
  };
}
