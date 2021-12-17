import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Scene, SubType, Prop } from '../src';

@Entity({
  title: 'SimpleUsage2',
})
/**
 * @class SimpleUsage2
 */
export class SimpleUsage2 {
  @Prop({ type: Number })
  public id: number;

  @Prop({
    scenes: Scene.from(
      {
        value: 1,
        type: SimpleBoy,
      },
      {
        value: 0,
        type: SimpleGirl,
      }
    ),
  })
  public person: SimpleBoy | SimpleGirl;

  @Prop({
    subTypes: SubType.from(
      {
        type: SimpleBoy,
        where: {
          sex: 1,
        },
      },
      {
        type: SimpleGirl,
        where: {
          sex: 0,
        },
      }
    ),
  })
  public children: SimpleGirl | SimpleBoy;
}

/**
 * @class AccountLoginLoginPc
 */
export class AccountLoginLoginPc {
  /**
   * 账号
   */
  @Prop.default
  public account: string;

  /**
   * 密码
   */
  @Prop.default
  public pwd: string;
}
