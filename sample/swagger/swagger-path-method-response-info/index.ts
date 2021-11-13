import { Prop } from '../../../src';
import { SwaggerPathMethodResponseInfoSchema } from '../swagger-path-method-response-info-schema';
import { SwaggerPathMethodResponseInfoContent } from '../swagger-path-method-response-info-content';

/**
 * @class SwaggerPathMethodResponseInfo
 */
export class SwaggerPathMethodResponseInfo {
  @Prop.default
  public description: string;

  /**
   * only 2.0
   */
  @Prop.default
  public schema?: SwaggerPathMethodResponseInfoSchema;

  /**
   * only 3.0
   */
  @Prop.default
  public content?: SwaggerPathMethodResponseInfoContent;
}
