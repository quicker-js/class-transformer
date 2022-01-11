import { ClassConstructor } from '@quicker-js/class-decorator';
import { Utils } from '../../utils';
import { BasePlugin } from '../base-plugin';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to Date
 * @class TransformToDate
 * @plugin TransformToDate
 */
export class TransformToDate extends BasePlugin {
  public static type = Date;

  public type = Date;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): Date | undefined => {
    return Utils.toDate(value);
  };

  public toPlain = (value: any): Date | undefined => {
    return Utils.toDate(value);
  };
}
