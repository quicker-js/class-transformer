import { ClassConstructor } from '@quicker-js/class-decorator';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';
import { TypedMetadataEnumImpl, TypedMetadataImpl } from '../../metadatas';

/**
 * Transform to Set
 * @class TransformToSet
 * @plugin TransformToSet
 */
export class TransformToSet extends BasePlugin {
  public static type = Set;

  public type = Set;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    metadata: TypedMetadataImpl | TypedMetadataEnumImpl | undefined,
    value: any
  ): Set<any> | undefined => {
    if (Array.isArray(value) || value instanceof Set) {
      if (elementType) {
        return new Set(
          Array.from(value).map((o) => {
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
          })
        );
      }
      return new Set(Array.from(value));
    }
  };

  public toPlain = (
    value: any,
    metadata?: TypedMetadataImpl | TypedMetadataEnumImpl
  ): any[] | undefined => {
    if (value instanceof Set) {
      return Array.from(value).map((o) =>
        this.classTransformer.instanceToPlain(o)
      );
    }
  };
}
