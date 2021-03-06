/**
 * MIT License
 * Copyright (c) 2021 YunlongRan<549510622@qq.com> @quicker-js/swagger-generator
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { SwaggerPathMethodParameter } from '../swagger-path-method-parameter';
import { SwaggerPathMethodSchema } from '../swagger-path-method-schema';
import { SwaggerPathMethodResponse } from '../swagger-path-method-response';
import { Typed, TypedArray } from '../../../src';

/**
 * @class SwaggerPathMethod
 */
export class SwaggerPathMethod {
  @TypedArray(String)
  public tags: string[];

  @Typed(String)
  public summary: string;

  /**
   * 描述
   * Support only <= 2.0
   */
  @Typed(String)
  public description: string;

  @Typed(String)
  public operationId: string;

  /**
   * Support only <= 2.0
   */
  @TypedArray(String)
  public produces: string[];

  @TypedArray(SwaggerPathMethodParameter)
  public parameters: SwaggerPathMethodParameter[] = [];

  @Typed(Boolean)
  public deprecated: boolean;

  @Typed(String)
  public style: string;

  @Typed(SwaggerPathMethodSchema)
  public schema: SwaggerPathMethodSchema;

  @Typed(SwaggerPathMethodResponse)
  public responses: SwaggerPathMethodResponse;

  /**
   * 获取带有[0].的参数
   * @private
   */
  public getSubParameters(): SwaggerPathMethodParameter[] {
    return this.parameters.filter((o) => /\[/.test(o.name));
  }

  /**
   * 获取不带[0].的参数
   * @private
   */
  public getNoSubParameters(): SwaggerPathMethodParameter[] {
    return this.parameters.filter((o) => !/\[/.test(o.name));
  }

  /**
   * 获取描述
   */
  public getDescription(): string {
    return this.summary || this.description;
  }
}
