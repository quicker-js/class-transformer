import { Entity, TypedAny, TypedEnum } from '../src';

@Entity({
  title: 'SimpleUsage3',
})
/**
 * @class SimpleUsage3
 */
export class SimpleUsage4 {
  @TypedEnum({
    enums: ['boy', 'girl'],
  })
  public type: 'boy' | 'girl';

  @TypedAny()
  public data: any;
}
