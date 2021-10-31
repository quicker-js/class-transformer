import { Entity, Type } from '../src';

@Entity({
  title: 'SimplePerson',
  description: 'SimplePerson 实体基类',
})
/**
 * @class SimplePerson
 */
export class SimplePerson {
  @Type
  public sex: number;

  @Type
  public id: number;

  @Type
  public age: number;

  @Type
  public name: string;
}
