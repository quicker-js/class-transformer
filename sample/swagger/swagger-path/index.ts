import { Prop } from '../../../src';
import { SwaggerDefinition } from '../swagger-definition';
import { SwaggerPathMethod } from '../swagger-path-method';

/**
 * @class SwaggerPath
 */
export class SwaggerPath {
  @Prop.default
  public get?: SwaggerPathMethod;

  @Prop.default
  public post?: SwaggerPathMethod;

  @Prop.default
  public delete?: SwaggerPathMethod;

  @Prop.default
  public put?: SwaggerPathMethod;
}
