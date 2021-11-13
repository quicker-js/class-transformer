import { Prop } from '../../../src';
import { SwaggerDefinition } from '../swagger-definition';

/**
 * @class SwaggerComponents
 */
export class SwaggerComponents {
  @Prop({
    type: SwaggerDefinition,
  })
  public schemas: Map<string, SwaggerDefinition>;
}
