import { Prop } from '../../../src';
import { SwaggerPathMethodResponse } from '../swagger-path-method-response';
import { SwaggerPathMethodResponseInfoSchema } from '../swagger-path-method-response-info-schema';

/**
 * @class SwaggerDefinitionProperty
 */
export class SwaggerDefinitionProperty {
  /**
   * prop的类型
   */
  @Prop.default
  public type: string;

  /**
   * prop的类格式
   */
  @Prop.default
  public format: string;

  /**
   * 类型 ref
   * Support only 3.0
   */
  @Prop.default
  public $ref?: string;

  /**
   * Support only <= 2.0
   */
  @Prop.default
  public items?: SwaggerPathMethodResponseInfoSchema;

  /**
   * 描述
   */
  @Prop.default
  public description: string;

  /**
   * 枚举值
   */
  @Prop({
    type: String,
  })
  public enum: string[];
}
