import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Prop, Scene } from '../src';

@Entity({
  scenes: [
    {
      value: 'PageList<SimpleGirl>',
      subScene: 'SimpleGirl',
    },
  ],
})
/**
 * @class PageList<T>
 */
export class PageList<T> {
  @Prop({
    scenes: Scene.from(
      {
        type: SimpleBoy,
        value: 'SimpleBoy',
      },
      {
        type: SimpleGirl,
        value: 'SimpleGirl',
      }
    ),
  })
  public list: T[];

  @Prop({
    type: Number,
  })
  public pageNo: number;

  @Prop({
    type: Number,
  })
  public pageSize: number;

  @Prop({
    type: Number,
  })
  public totalCount: number;

  @Prop({
    type: Number,
  })
  public totalPage: number;
}
