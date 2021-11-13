import { Prop } from '../../../src';

/**
 * @class SwaggerApiServer
 */
export class SwaggerApiServer {
  /**
   * 地址
   */
  @Prop.default
  public url: string;

  /**
   * 描述
   */
  @Prop.default
  public description: string;
}
