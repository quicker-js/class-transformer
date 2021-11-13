import { ClassMetadata } from '@quicker-js/class-decorator';
import { SceneImpl } from '../../lib';

/**
 * 实体装饰器元数据类
 * @class Index
 */
export class EntityMetadata<
  T = EntityMetadataOption
> extends ClassMetadata<T> {}

export interface EntityMetadataOption {
  /**
   * 标题
   */
  readonly title?: string;
  /**
   * 描述
   */
  readonly description?: string;
  /**
   * flag 用于范型类匹配 flag 使用
   */
  readonly scenes?: Omit<SceneImpl, 'type'>[];
  /**
   * subTypes 用于范型类匹配 subType 使用
   */
  readonly subTypes?: Record<PropertyKey, any>[];
  /**
   * 默认false
   */
  toPlainOnly?: boolean;
  /**
   * 默认false
   */
  toInstanceOnly?: boolean;
}
