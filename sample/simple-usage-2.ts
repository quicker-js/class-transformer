import { Entity, FlagDiscriminator, SubTypeDiscriminator, Type } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';

@Entity({
  title: 'SimpleUsage2',
})
/**
 * @class SimpleUsage2
 */
export class SimpleUsage2 {
  @Type({ type: Number })
  public id: number;

  @Type({
    flags: FlagDiscriminator.includes(
      {
        value: 1,
        type: SimpleBoy,
      },
      {
        value: 0,
        type: SimpleGirl,
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
        type: SimpleBoy,
        where: {
          sex: 0,
        },
      }
    ),
  })
  public children: SimpleGirl | SimpleBoy;
}
