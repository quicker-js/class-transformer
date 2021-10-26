import { Entity, Type } from '../src';
import { SimpleUsage1 } from './simple-usage-1';

@Entity('SimpleUsage2', 'SimpleUsage2')
/**
 * @class SimpleUsage2
 */
export class SimpleUsage2 extends SimpleUsage1 {
  @Type
  public value: boolean;
}
