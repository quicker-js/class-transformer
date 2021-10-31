import { PropertyMirror } from '@quicker-js/class-decorator';
import { TypeMetadata, TypeMetadataOption } from './type-metadata';

export * from './type-metadata';

/**
 * 无参数Type装饰器
 * @param target
 * @param propertyKey
 * @constructor
 * 使用此装饰器在转换类型时 默认按照typescript的反射类型转换 参照`Reflect.getMetadata("design:type")`方法的返回值
 * Example
 * ```ts
 *  class SimpleUsage {
 *    // userName的类型为string 因此使用默认的String来转换
 *    @Type
 *    public userName: string;
 *  }
 * ```
 */
export function Type(target: Object, propertyKey: string | symbol): void;
/**
 * 带参数Type装饰器
 * @param option
 * @constructor
 *
 * Example
 * ```ts
 *  class User {
 *    @Type
 *    public id: number;
 *
 *    @Type
 *    public name: string;
 *  }
 *
 *  class SimpleUsage {
 *    // 使用String类型覆盖 "design:type" 反射的number类型
 *    @Type({type: String})
 *    public uuid: number;
 *
 *    // 使用自定义类 `User` 来转换
 *    @Type({type: User})
 *    public user: User;
 *  }
 * ```
 */
export function Type(option: TypeMetadataOption): PropertyDecorator;

/**
 * Type 装饰器的实现
 * @param args
 * @constructor
 */
export function Type(...args: unknown[]): PropertyDecorator | void {
  if (args.length === 1) {
    const [option] = args as [TypeMetadataOption];
    return PropertyMirror.createDecorator(new TypeMetadata(option));
  } else {
    const [target, propertyKey] = args as [Object, string | symbol];
    return PropertyMirror.createDecorator(new TypeMetadata(null))(
      target,
      propertyKey
    );
  }
}
