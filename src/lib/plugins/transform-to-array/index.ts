import { ClassConstructor } from '@quicker-js/class-decorator';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to Array
 * @class TransformToArray
 * @plugin TransformToArray
 */
export class TransformToArray extends BasePlugin {
  public static type = Array;

  public type = Array;

  public transform = <T extends {}>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): any[] | undefined => {
    if (Array.isArray(value) || value instanceof Set) {
      if (elementType) {
        return Array.from(value).map((o) => {
          const type = elementType.type(o);
          if (type) {
            return this.classTransformer.transform(
              type,
              elementType.elementType(),
              undefined,
              o,
              {
                scene: this.scene,
              }
            );
          }
        });
      }
      return Array.from(value);
    }
  };

  public toPlain = <T>(
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): T | undefined => {
    if (Array.isArray(value)) {
      return value.map((o) => this.classTransformer.instanceToPlain(o)) as any;
    }
  };
}
