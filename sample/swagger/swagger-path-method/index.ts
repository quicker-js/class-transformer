import { Prop } from '../../../src';
import { SwaggerPathMethodParameter } from '../swagger-path-method-parameter';
import { SwaggerPathMethodSchema } from '../swagger-path-method-schema';
import { SwaggerPathMethodResponse } from '../swagger-path-method-response';

/**
 * @class SwaggerPathMethod
 */
export class SwaggerPathMethod {
  @Prop({
    type: String,
  })
  public tags: string[];

  @Prop.default
  public summary: string;

  /**
   * 描述
   * Support only <= 2.0
   */
  @Prop.default
  public description: string;

  @Prop.default
  public operationId: string;

  /**
   * Support only <= 2.0
   */
  @Prop({
    type: String,
  })
  public produces: string[];

  @Prop({
    type: SwaggerPathMethodParameter,
  })
  public parameters: SwaggerPathMethodParameter[] = [];

  @Prop.default
  public deprecated: boolean;

  @Prop.default
  public style: string;

  @Prop.default
  public schema: SwaggerPathMethodSchema;

  @Prop.default
  public responses: SwaggerPathMethodResponse;
}
