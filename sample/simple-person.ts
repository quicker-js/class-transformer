import moment from 'moment';
import { Typed } from '../src';

/**
 * @class SimplePerson
 */
export class SimplePerson {
  @Typed()
  public path: RegExp;

  @Typed()
  public sex: number;

  @Typed()
  public id: number;

  @Typed()
  public age: number;

  @Typed()
  public name: string;

  @Typed(Date, {
    name: 'createDate',
    transform: (current) => moment(current),
    toInstanceOnly: true,
  })
  @Typed(Date, {
    name: 'createDate',
    transform: (current) => moment(current).format('YYYY-MM-DD HH:mm:ss'),
    toPlainOnly: true,
  })
  public createTime: Date;

  @Typed(SimplePerson)
  public child: SimplePerson;
}
