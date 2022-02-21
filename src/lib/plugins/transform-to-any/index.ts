import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';
import { Any } from '../../types';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to any
 * @class TransformToAny
 * @plugin TransformToAny
 */
export class TransformToAny extends BasePlugin {
  public static type = Any;

  public type = Any;

  public transform = <T extends {}>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): any => {
    return value;
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl | undefined
  ): any => {
    return value;
  };
}
