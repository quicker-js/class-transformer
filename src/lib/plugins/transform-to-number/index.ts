import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to number
 * @class TransformToNumber
 * @plugin TransformToNumber
 */
export class TransformToNumber extends BasePlugin {
  public static type = Number;

  public type = Number;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): number => {
    return Utils.toNumber(value);
  };

  public toPlain = (value: any): number => {
    return Utils.toNumber(value);
  };
}
