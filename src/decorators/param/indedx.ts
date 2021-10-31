import {
  ParameterMetadata,
  ParameterMirror,
} from '@quicker-js/class-decorator';

/**
 * 属性装饰器
 * @param p
 * @deprecated
 * @constructor
 */
export function Param(p: string): ParameterDecorator {
  return (target, propertyKey, index): void => {
    console.log(target, propertyKey, index);
    ParameterMirror.createDecorator(new ParameterMetadata(p))(
      target,
      propertyKey,
      index
    );
  };
}
