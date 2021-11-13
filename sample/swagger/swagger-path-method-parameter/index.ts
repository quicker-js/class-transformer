import { Prop } from '../../../src';

/**
 * @class SwaggerPathMethodParameter
 */
export class SwaggerPathMethodParameter {
  @Prop.default
  public name: string;

  @Prop.default
  public in: string;

  @Prop.default
  public description: string;

  @Prop.default
  public required: boolean;

  @Prop.default
  public type: string;

  @Prop.default
  public format: string;
}
