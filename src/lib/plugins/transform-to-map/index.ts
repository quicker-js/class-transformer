import { ClassConstructor } from '@quicker-js/class-decorator';
import { BasePlugin } from '../base-plugin';
import { Utils } from '../../utils';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to Map
 * @class TransformToMap
 * @plugin TransformToMap
 */
export class TransformToMap extends BasePlugin {
  public static type = Map;

  public type = Map;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): Map<PropertyKey, any> | undefined => {
    if (typeof value === 'object' && value !== null) {
      const map = new Map();
      const objectKeys = Utils.objectKeys(value);
      objectKeys.forEach((key) => {
        if (elementType) {
          const mirrorType = elementType.type(value[key]);
          if (mirrorType) {
            map.set(
              key,
              this.classTransformer.transform(
                mirrorType,
                elementType.elementType(),
                value[key],
                {
                  scene: this.scene,
                }
              )
            );
          } else {
            map.set(key, value[key]);
          }
        } else {
          map.set(key, value[key]);
        }
      });
      return map;
    }
  };

  public toPlain = (value: any): Record<PropertyKey, any> | undefined => {
    if (value instanceof Map) {
      const o: Record<PropertyKey, any> = {};
      value.forEach((v, k) => {
        o[k] = this.classTransformer.instanceToPlain(v);
      });
      return o;
    }
  };
}
