import { FlagDiscriminator, SubTypeDiscriminator, Type } from '../src';
import { PageList } from './page-list';
import { SimpleGirl } from './simple-girl';
import { SimpleBoy } from './simple-boy';

/**
 * 响应数据类型
 */
export class ResponseOk<T> {
  @Type
  public msg: string;

  @Type
  public code: number;

  @Type({
    flags: FlagDiscriminator.includes(PageList, SimpleGirl, SimpleBoy),
  })
  public data: T;

  @Type({
    subTypes: SubTypeDiscriminator.includes(SimpleGirl, SimpleBoy),
  })
  public person: SimpleGirl | SimpleBoy;
}
