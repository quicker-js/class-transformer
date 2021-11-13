import { Prop } from '../../../src';
import { SwaggerPathMethodResponseInfo } from '../swagger-path-method-response-info';

/**
 * @class SwaggerPathMethodResponse
 */
export class SwaggerPathMethodResponse {
  @Prop.default
  public 200: SwaggerPathMethodResponseInfo;

  @Prop.default
  public 201: SwaggerPathMethodResponseInfo;

  @Prop.default
  public 401: SwaggerPathMethodResponseInfo;

  @Prop.default
  public 403: SwaggerPathMethodResponseInfo;

  @Prop.default
  public 404: SwaggerPathMethodResponseInfo;
}
