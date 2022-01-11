import { PageList } from './page-list';
import { SimpleGirl } from './simple-girl';
import { SimpleBoy } from './simple-boy';
import { Typed, TypedArray } from '../src';

/**
 * 响应数据类型
 */
export class ResponseResult<T = any> {
  @Typed()
  public msg: string;

  @Typed()
  public code: number;

  @Typed(PageList, {
    scenes: [
      { value: 'PageList<SimpleBoy>', subValue: 'SimpleBoy' },
      { value: 'PageList<SimpleGirl>', subValue: 'SimpleGirl' },
    ],
  })
  @Typed(SimpleGirl, {
    scenes: [{ value: 'SimpleGirl' }],
  })
  @Typed(SimpleBoy, {
    scenes: [{ value: 'SimpleBoy' }],
  })
  @TypedArray(SimpleGirl, {
    scenes: [{ value: 'List<SimpleGirl>', subValue: 'SimpleGirl' }],
  })
  @TypedArray(SimpleBoy, {
    scenes: [{ value: 'List<SimpleBoy>', subValue: 'SimpleBoy' }],
  })
  public data: T;
}
