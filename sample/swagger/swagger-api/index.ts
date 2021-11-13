import { Prop } from '../../../src';
import { SwaggerApiInfo } from '../swagger-api-info';
import { SwaggerApiServer } from '../swagger-api-server';
import { SwaggerApiTag } from '../swagger-api-tag';
import { SwaggerComponents } from '../swagger-components';
import { SwaggerPath } from '../swagger-path';
import { SwaggerDefinition } from '../swagger-definition';

/**
 * @class SwaggerApi
 */
export class SwaggerApi {
  /**
   * open api版本
   */
  @Prop.default
  public openapi: string;

  /**
   * open api版本
   * only 2.0
   */
  @Prop.default
  public swagger: string;

  /**
   * 文档信息
   */
  @Prop.default
  public info: SwaggerApiInfo;

  /**
   * 服务端地址
   */
  @Prop({
    type: SwaggerApiServer,
  })
  public servers: SwaggerApiServer[];

  /**
   * tags
   */
  @Prop({
    type: SwaggerApiTag,
  })
  public tags: SwaggerApiTag[];

  /**
   * host
   * only 2.0
   */
  @Prop.default
  public host?: string;

  /**
   * 基础路径
   * only 2.0
   */
  @Prop.default
  public basePath: string;

  /**
   * Model集合
   * only 2.0
   */
  @Prop({
    type: SwaggerDefinition,
  })
  public definitions: Map<string, SwaggerDefinition>;

  /**
   * path集合
   */
  @Prop({
    type: SwaggerPath,
  })
  public paths: Map<string, SwaggerPath>;

  /**
   * Model集合
   * only 3.0
   */
  @Prop.default
  public components: SwaggerComponents;
}
