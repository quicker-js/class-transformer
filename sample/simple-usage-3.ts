import { Entity, FlagDiscriminator, SubTypeDiscriminator, Type } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';

@Entity({
  title: 'SimpleUsage3',
})
/**
 * @class SimpleUsage3
 */
export class SimpleUsage3 {
  @Type
  public id: number;

  @Type({
    flags: FlagDiscriminator.includes(
      {
        value: 0,
        type: SimpleGirl,
      },
      {
        value: 1,
        type: SimpleBoy,
      }
    ),
  })
  public person: SimpleBoy | SimpleGirl;

  @Type({
    subTypes: SubTypeDiscriminator.includes(
      {
        type: SimpleBoy,
        where: {
          sex: 1,
        },
      },
      {
        type: SimpleGirl,
        where: {
          sex: 0,
        },
      }
    ),
  })
  public children: SimpleGirl[] | SimpleBoy[];
}
