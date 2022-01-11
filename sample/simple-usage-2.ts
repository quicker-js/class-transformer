import { SimpleBoy } from './simple-boy';
import { SimpleGirl } from './simple-girl';
import { Entity, Typed, TypeMirror } from '../src';

@Entity({
  title: 'SimpleUsage2',
})
/**
 * @class SimpleUsage2
 */
export class SimpleUsage2 {
  @Typed()
  public id: number;

  @Typed(SimpleBoy, { scenes: [{ value: 1 }] })
  @Typed(SimpleGirl, { scenes: [{ value: 0 }] })
  public person: SimpleBoy | SimpleGirl;

  @Typed(
    TypeMirror.createWhereMirror(
      {
        subType: SimpleGirl,
        wheres: [{ sex: 0 }],
      },
      {
        subType: SimpleBoy,
        wheres: [{ sex: 1 }],
      }
    )
  )
  public children: SimpleGirl | SimpleBoy;
}

/**
 * @class AccountLoginLoginPc
 */
export class AccountLoginLoginPc {
  /**
   * 账号
   */
  @Typed()
  public account: string;

  /**
   * 密码
   */
  @Typed()
  public pwd: string;
}
