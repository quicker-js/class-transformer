import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to boolean
 * @class TransformToBoolean
 * @plugin TransformToBoolean
 */
export class TransformToBoolean extends BasePlugin {
  public static type = Boolean;

  public type = Boolean;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): boolean => {
    return Utils.toBoolean(value);
  };

  public toPlain = (value: any): boolean => {
    return Utils.toBoolean(value);
  };
}
