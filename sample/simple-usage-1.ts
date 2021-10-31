import { Entity, FlagDiscriminator, SubTypeDiscriminator, Type } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';

@Entity({
  title: 'SimpleUsage1',
})
/**
 * @class SimpleUsage1
 */
export class SimpleUsage1 {
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
  public person: SimpleBoy[] | SimpleGirl[];

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
      },
      {
        type: SimpleGirl,
        where: {
          sex: '女',
        },
      },
      {
        type: SimpleGirl,
        where: {
          sex: SimpleGirl,
        },
      }
    ),
  })
  public children: SimpleGirl[] | SimpleBoy[];
}
