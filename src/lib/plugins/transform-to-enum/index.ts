import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';
import { EnumArray } from '../../types';
import { TypedMetadataEnumImpl } from '../../metadatas';

/**
 * Transform to enum
 * @class TransformToEnum
 * @plugin TransformToEnum
 */
export class TransformToEnum extends BasePlugin {
  public static type = EnumArray;

  public type = EnumArray;

  public transform = <T extends {}>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataEnumImpl | undefined,
    value: any
  ): any => {
    if (
      metadata &&
      Array.isArray(metadata.enums) &&
      metadata.enums.includes(value)
    ) {
      return value;
    }
    return undefined;
  };

  public toPlain = (value: any, metadata?: TypedMetadataEnumImpl): any => {
    if (
      metadata &&
      Array.isArray(metadata.enums) &&
      metadata.enums.includes(value)
    ) {
      return value;
    }
    return undefined;
  };
}
