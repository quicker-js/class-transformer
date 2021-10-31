import { ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata, EntityMetadataOption } from './entity-metadata';

export * from './entity-metadata';

/**
 * 带参数实体装饰器
 * @constructor
 * @param option
 */
export function Entity(option: EntityMetadataOption): ClassDecorator {
  return ClassMirror.createDecorator(new EntityMetadata(option));
}
