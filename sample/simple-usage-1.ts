import { Entity, Typed } from '../src';
import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { TypedArray } from '../src/decorators/typed-array';
import { SimplePerson } from './simple-person';

@Entity({
  title: 'SimpleUsage1',
})
/**
 * @class SimpleUsage1
 */
export class SimpleUsage1 {
  @Typed(Number)
  public id: number;

  @Typed(SimplePerson)
  public person: SimplePerson;

  @TypedArray(SimpleGirl, {
    scenes: [{ value: 0 }],
  })
  @TypedArray(SimpleBoy, {
    scenes: [{ value: 1 }],
  })
  public children: SimpleBoy[] | SimpleGirl[];
}
