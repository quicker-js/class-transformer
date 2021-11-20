import { Entity, Prop } from '../src';
import moment from 'moment';

@Entity({
  title: 'SimplePerson',
  description: 'SimplePerson 实体基类',
})
/**
 * @class SimplePerson
 */
export class SimplePerson {
  @Prop.default
  public sex: number;

  @Prop.default
  public id: number;

  @Prop({
    type: Number,
    toInstanceOnly: true,
  })
  @Prop({
    type: String,
    toPlainOnly: true,
  })
  public age: number;

  @Prop.default
  public name: string;

  @Prop({
    transform: (value) => moment(value),
    toPlainOnly: true,
  })
  public createTime: Date;
}
