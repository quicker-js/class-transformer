import { Prop } from '../../../src';

/**
 * @class SwaggerPathMethodResponseInfoSchema
 */
export class SwaggerPathMethodResponseInfoSchema {
  /**
   * only 2.0
   */
  @Prop.default
  public originalRef?: string;

  @Prop.default
  public $ref: string;
}
