import { PropertyMirror } from '@quicker-js/class-decorator';
import { PropMetadata, PropMetadataImpl } from '../../metadatas';

/**
 * 带参数Type装饰器
 * @param option
 * @constructor
 *
 * Example
 * ```ts
 *  class User {
 *   @Prop
 *    public id: number;
 *
 *   @Prop
 *    public name: string;
 *  }
 *
 *  class SimpleUsage {
 *    // 使用String类型覆盖 "design:type" 反射的number类型
 *    @Prop({type: String})
 *    public uuid: number;
 *
 *    // 使用自定义类 `User` 来转换
 *    @Prop({type: User})
 *    public user: User;
 *  }
 * ```
 */
export function Prop(option: PropMetadataImpl): PropertyDecorator {
  return PropertyMirror.createDecorator(new PropMetadata(option));
}

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
 *    @prop
 *    public userName: string;
 *  }
 * ```
 */
function prop(target: Object, propertyKey: string | symbol): void {
  return PropertyMirror.createDecorator(new PropMetadata(null))(
    target,
    propertyKey
  );
}

Prop.default = prop;
