import { ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata, EntityMetadataOption } from '../../lib';

/**
 * 带参数实体装饰器
 * @constructor
 * @param option
 */
export function Entity(option: EntityMetadataOption): ClassDecorator {
  return ClassMirror.createDecorator(new EntityMetadata(option));
}

/**
 * 无参数实体装饰器
 */
function entity<TFunction extends Function>(
  target: TFunction
): TFunction | void {
  return ClassMirror.createDecorator(new EntityMetadata(null))(target);
}

Entity.decorate = entity;
