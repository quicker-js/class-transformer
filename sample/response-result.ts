import { FlagDiscriminator, Type } from '../src';
import { PageList } from './page-list';
import { SimpleGirl } from './simple-girl';
import { SimpleBoy } from './simple-boy';

/**
 * 响应数据类型
 */
export class ResponseResult<T> {
  @Type
  public msg: string;

  @Type
  public code: number;

  @Type({
    flags: FlagDiscriminator.includes(
      {
        type: PageList,
        value: 'PageList<SimpleBoy>',
        subFlag: 'SimpleBoy',
      },
      {
        type: PageList,
        value: 'PageList<SimpleGirl>',
        subFlag: 'SimpleGirl',
      },
      {
        type: SimpleGirl,
        value: 'SimpleGirl',
        designType: Array,
      },
      {
        type: SimpleGirl,
        value: 'List<SimpleGirl>',
        designType: Array,
      },
      {
        type: SimpleBoy,
        value: 'SimpleBoy',
      },
      {
        type: SimpleBoy,
        value: 'List<SimpleBoy>',
        designType: Array,
      },
      {
        type: SimpleBoy,
        value: 'Set<SimpleBoy>',
        designType: Set,
      }
    ),
  })
  public data: T;
}
