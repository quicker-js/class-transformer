import { ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata } from './entity-metadata';

export * from './entity-metadata';

/**
 * 无参数实体装饰器
 * @param target
 * @constructor
 */
export function Entity<T extends Function>(target: T): T | void;
/**
 * 带参数实体装饰器
 * @constructor
 * @param title
 * @param description
 */
export function Entity(title: string, description: string): ClassDecorator;
/**
 * 实现函数
 * @param args
 * @constructor
 */
export function Entity<T extends Function>(
  ...args: unknown[]
): T | void | ClassDecorator {
  if (args.length === 2) {
    const [title, description] = args as [string, string];
    return ClassMirror.createDecorator(
      new EntityMetadata({
        title,
        description,
      })
    );
  } else {
    return ClassMirror.createDecorator(new EntityMetadata(null))(args[0] as T);
  }
}
