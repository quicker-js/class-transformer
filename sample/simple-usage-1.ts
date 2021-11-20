import { Entity, Scene, Prop, SubType } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';

@Entity({
  title: 'SimpleUsage1',
})
/**
 * @class SimpleUsage1
 */
export class SimpleUsage1 {
  @Prop.default
  public id: number;

  @Prop({
    scenes: Scene.from(
      {
        value: 0,
        type: SimpleGirl,
      },
      {
        value: 1,
        type: Array,
        elementType: SimpleBoy,
      }
    ),
  })
  public person: SimpleBoy[] | SimpleGirl[];

  @Prop({
    subTypes: SubType.from(
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
