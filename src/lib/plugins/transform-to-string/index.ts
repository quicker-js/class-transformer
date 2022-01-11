import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to string
 * @class TransformToString
 * @plugin TransformToString
 */
export class TransformToString extends BasePlugin {
  public static type = String;

  public type = String;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): String | undefined => {
    return Utils.toString(value);
  };

  public toPlain = (value: any): string => {
    return Utils.toString(value);
  };
}
