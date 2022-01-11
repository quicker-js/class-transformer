import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Typed } from '../src';
import { TypedArray } from '../src/decorators/typed-array';

@Entity({
  title: 'PageList',
  description: 'PageList<T>',
})
/**
 * @class PageList<T>
 */
export class PageList<T> {
  @TypedArray(SimpleBoy, {
    scenes: [{ value: 'SimpleBoy' }],
  })
  @TypedArray(SimpleGirl, {
    scenes: [{ value: 'SimpleGirl' }],
  })
  public list: T[];

  @Typed(Number)
  public pageNo: number;

  @Typed(Number)
  public pageSize: number;

  @Typed(Number)
  public totalCount: number;

  @Typed(Number)
  public totalPage: number;
}
