import { Prop } from '../../../src';

/**
 * @class SwaggerApiInfo
 */
export class SwaggerApiInfo {
  /**
   * 标题
   */
  @Prop.default
  public title: string;

  /**
   * 描述
   */
  @Prop.default
  public description: string;

  /**
   * 版本号
   */
  @Prop.default
  public version: string;
}
