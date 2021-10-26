import { Entity, Type } from '../src';

@Entity('SimpleUsage1', 'SimpleUsage1')
/**
 * @class SimpleUsage1
 */
export class SimpleUsage1 {
  @Type
  public id: number;

  @Type({
    constructor: String,
    discriminator: {
      property: 'doc',
      subTypes: [
        { value: SimpleUsage1, name: 'xx' },
        { value: SimpleUsage1, name: 'xx' },
        { value: SimpleUsage1, name: 'xx' },
      ],
    },
  })
  public name: string;

  @Type
  public static id: boolean;
}
