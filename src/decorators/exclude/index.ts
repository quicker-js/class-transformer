import { ExcludeMetadata, ExcludeMetadataOption } from './exclude-metadata';
import { PropertyMirror } from '@quicker-js/class-decorator';

/**
 * Exclude 无参数装饰器
 * @param target
 * @param propertyKey
 * @constructor
 * 使用此装饰器后 转换时会排除此参数的生成 被该装饰器装饰的参数一般设置为undefined类型
 */
export function Exclude(target: Object, propertyKey: string | symbol): void;
/**
 * Exclude 带参数装饰器
 * @param option
 * @constructor
 * 使用此装饰器可以将 `toPlainOnly` 或者 `toClassOnly` 标记为true 转换时 根据条件进行转换
 */
export function Exclude(option: ExcludeMetadataOption): PropertyDecorator;
/**
 * Exclude 装饰器实现
 * @param args
 * @constructor
 */
export function Exclude(...args: unknown[]): void | PropertyDecorator {
  if (args.length === 1) {
    return PropertyMirror.createDecorator(
      new ExcludeMetadata(args[0] as ExcludeMetadataOption)
    );
  } else {
    const [target, propertyKey] = args as [Object, string | symbol];
    return PropertyMirror.createDecorator(new ExcludeMetadata(null))(
      target,
      propertyKey
    );
  }
}
