import { Prop } from '../../../src';

/**
 * @class SwaggerApiTag
 */
export class SwaggerApiTag {
  /**
   * 名称
   */
  @Prop.default
  public name: string;

  /**
   * 描述
   */
  @Prop.default
  public description: string;
}
