import { ClassMetadata } from '@quicker-js/class-decorator';

/**
 * 实体装饰器元数据类
 * @class EntityMetadata
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
}
