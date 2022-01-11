import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypeMirror } from '../../type-mirror';

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
    value: any
  ): Function | undefined => {
    return Utils.toFunction(value);
  };

  public toPlain = (value: any): Function | undefined => {
    return Utils.toFunction(value);
  };
}
