import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Scene, Prop, SubType } from '../src';

@Entity({
  title: 'SimpleUsage3',
})
/**
 * @class SimpleUsage3
 */
export class SimpleUsage3 {
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
        type: SimpleBoy,
      }
    ),
  })
  public person: SimpleBoy | SimpleGirl;

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
      }
    ),
  })
  public children: SimpleGirl[] | SimpleBoy[];
}
