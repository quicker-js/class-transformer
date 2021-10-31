import { ClassMetadata } from '@quicker-js/class-decorator';
import { Flag, FlagDiscriminator, SubTypeDiscriminator } from '../../lib';

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
  /**
   * flag 用于范型类匹配 flag 使用
   */
  readonly flags?: Map<Flag, FlagDiscriminator>;
  /**
   * subTypes 用于范型类匹配 subType 使用
   */
  readonly includes?: Omit<SubTypeDiscriminator, 'whereMap' | 'type'>[];
}
