import { Prop } from '../../../src';

/**
 * @class SwaggerPathMethodSchema
 */
export class SwaggerPathMethodSchema {
  /**
   * 类型
   */
  @Prop.default
  public type: string;

  /**
   * 格式
   */
  @Prop.default
  public format: string;
}
