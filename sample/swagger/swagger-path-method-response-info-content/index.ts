import { Prop } from '../../../src';
import { SwaggerPathMethodResponseInfoSchema } from '../swagger-path-method-response-info-schema';

/**
 * @class SwaggerPathMethodResponseInfoContent
 */
export class SwaggerPathMethodResponseInfoContent {
  @Prop.default
  public '*/*': SwaggerPathMethodResponseInfoSchema;
}
