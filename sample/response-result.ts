import { PageList } from './page-list';
import { SimpleGirl } from './simple-girl';
import { SimpleBoy } from './simple-boy';
import { Scene, Prop } from '../src';

/**
 * 响应数据类型
 */
export class ResponseResult<T> {
  @Prop.default
  public msg: string;

  @Prop.default
  public code: number;

  @Prop({
    scenes: Scene.from(
      {
        type: PageList,
        value: 'PageList<SimpleBoy>',
        subScene: 'SimpleBoy',
      },
      {
        type: PageList,
        value: 'PageList<SimpleGirl>',
        subScene: 'SimpleGirl',
      },
      {
        type: SimpleGirl,
        value: 'SimpleGirl',
      },
      {
        type: Set,
        elementType: SimpleGirl,
        value: 'Set<SimpleGirl>',
      },
      {
        type: Array,
        elementType: SimpleGirl,
        value: 'List<SimpleGirl>',
      },
      {
        type: SimpleBoy,
        value: 'SimpleBoy',
      },
      {
        type: Array,
        elementType: SimpleBoy,
        value: 'List<SimpleBoy>',
      },
      {
        type: Set,
        elementType: SimpleBoy,
        value: 'Set<SimpleBoy>',
      }
    ),
  })
  public data: T;
}
