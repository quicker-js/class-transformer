import { Prop } from '../../../src';
import { SwaggerDefinitionProperty } from '../swagger-definition-property';

/**
 * @class SwaggerDefinition
 */
export class SwaggerDefinition {
  /**
   * model的类型
   */
  @Prop.default
  public type: string;

  @Prop({
    type: SwaggerDefinitionProperty,
  })
  public properties: Map<string, SwaggerDefinitionProperty> = new Map();

  /**
   * model的标题
   */
  @Prop.default
  public title: string;

  /**
   * model的描述
   */
  @Prop.default
  public description: string;
}
