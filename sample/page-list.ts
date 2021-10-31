import { Entity, FlagDiscriminator, Type } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';

@Entity({
  flags: FlagDiscriminator.define({
    value: 'PageList<SimpleGirl>',
    subFlag: 'SimpleGirl',
  }),
})
/**
 * @class PageList<T>
 */
export class PageList<T> {
  @Type({
    flags: FlagDiscriminator.includes(
      {
        value: 'SimpleBoy',
        type: SimpleBoy,
      },
      {
        value: 'SimpleGirl',
        type: SimpleGirl,
      }
    ),
  })
  public list: T[];

  @Type
  public pageNo: number;

  @Type
  public pageSize: number;

  @Type
  public totalCount: number;

  @Type
  public totalPage: number;
}
