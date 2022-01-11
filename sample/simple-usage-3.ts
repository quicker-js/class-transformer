import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Typed, TypeMirror } from '../src';
import { TypedArray } from '../src/decorators/typed-array';

@Entity({
  title: 'SimpleUsage3',
})
/**
 * @class SimpleUsage3
 */
export class SimpleUsage3 {
  @Typed()
  public id: number;

  @Typed(SimpleGirl, {
    scenes: [{ value: 0 }],
  })
  @Typed(SimpleBoy, {
    scenes: [{ value: 1 }],
  })
  public person: SimpleBoy | SimpleGirl;

  @TypedArray(
    TypeMirror.createWhereMirror(
      {
        subType: SimpleBoy,
        wheres: [
          {
            sex: 1,
          },
        ],
      },
      {
        subType: SimpleGirl,
        wheres: [
          {
            sex: 0,
          },
        ],
      }
    )
  )
  public children: SimpleGirl[] | SimpleBoy[];
}
