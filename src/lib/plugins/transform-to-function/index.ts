import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to Function
 * @class TransformToFunction
 * @plugin TransformToFunction
 */
export class TransformToFunction extends BasePlugin {
  public static type = Function;

  public type = Function;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): Function | undefined => {
    return Utils.toFunction(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): Function | undefined => {
    return Utils.toFunction(value);
  };
}
