import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to Symbol
 * @class TransformToSymbol
 * @plugin TransformToSymbol
 */
export class TransformToSymbol extends BasePlugin {
  public static type = Symbol;

  public type = Symbol;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): Symbol | undefined => {
    return Utils.toSymbol(value);
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): symbol | undefined => {
    return Utils.toSymbol(value);
  };
}
