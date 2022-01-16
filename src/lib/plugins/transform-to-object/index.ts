import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { BasePlugin } from '../base-plugin';
import { TypedMetadata, TypedMetadataImpl } from '../../metadatas';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to Object
 * @class TransformToObject
 * @plugin TransformToObject
 */
export class TransformToObject extends BasePlugin {
  public static type = Object;

  public type = Object;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): Object | undefined => {
    if (type && value && ![Array, Set].includes(value.constructor)) {
      const newValue = this.classTransformer.newInstance(type) as any;
      const classMirror = ClassMirror.reflect(type);
      const propertyMirrors = classMirror.getPropertyMirrors(true);
      propertyMirrors.forEach((propertyMirror) => {
        const { propertyKey } = propertyMirror;
        /// ts映射类型
        const designType = propertyMirror.getDesignType();
        /// 实例默认值
        const originValue = newValue[propertyKey];
        /// 所有元数据
        const allMetadata =
          propertyMirror.getMetadata<TypedMetadata<TypedMetadataImpl>>(
            TypedMetadata
          );
        /// 有元数据 有可能用了其他装饰器 使用默认 `designType` 类型转换
        if (allMetadata.size > 0) {
          allMetadata.forEach((propertyMetadata) => {
            const { propertyKey } = propertyMetadata;
            let v = value[propertyKey];
            const { mirror, metadata } = propertyMetadata;
            if (mirror) {
              const mirrorType = mirror.type(v);
              if (mirrorType) {
                if (metadata) {
                  const { scenes, toPlainOnly, transform, name } = metadata;
                  if (name) {
                    v = value[name];
                  }
                  if (!toPlainOnly) {
                    let scene = this.scene;
                    if (Array.isArray(scenes)) {
                      const find = scenes.find((o) => o.value === this.scene);
                      if (!find) {
                        return;
                      }
                      scene = find.subValue;
                    }
                    newValue[propertyKey] = this.classTransformer.transform(
                      mirrorType,
                      mirror.elementType(),
                      v,
                      { scene }
                    );

                    if (transform) {
                      newValue[propertyKey] = transform(
                        newValue[propertyKey],
                        value,
                        propertyMetadata,
                        allMetadata
                      );
                    }
                  }
                } else {
                  newValue[propertyKey] = this.classTransformer.transform(
                    mirrorType,
                    mirror.elementType(),
                    v
                  );
                }
              } else {
                newValue[propertyKey] = this.classTransformer.transform(
                  designType as ClassConstructor,
                  undefined,
                  value[propertyKey]
                );
              }
            } else {
              newValue[propertyKey] = this.classTransformer.transform(
                designType as ClassConstructor,
                undefined,
                value[propertyKey]
              );
            }
          });
        } else {
          newValue[propertyKey] = this.classTransformer.transform(
            designType as ClassConstructor,
            undefined,
            value[propertyKey]
          );
        }

        /// 如果有默认值，没有转换值 恢复默认值
        if (originValue && newValue[propertyKey] === undefined) {
          newValue[propertyKey] = originValue;
        }
      });
      return newValue;
    }
    return undefined;
  };

  public toPlain = (value: any): Record<PropertyKey, any> | undefined => {
    if (typeof value === 'object' && value !== null) {
      const o: Record<PropertyKey, any> = {};
      const classMirror = ClassMirror.reflect(value.constructor);
      const propertyMirrors = classMirror.getPropertyMirrors(true);
      propertyMirrors.forEach((propertyMirror) => {
        const allMetadata =
          propertyMirror.getMetadata<TypedMetadata<TypedMetadataImpl>>(
            TypedMetadata
          );

        const { propertyKey } = propertyMirror;
        let v = value[propertyKey];

        if (allMetadata.size > 0) {
          allMetadata.forEach((propertyMetadata) => {
            const { metadata, mirror } = propertyMetadata;
            if (metadata) {
              const { name, toInstanceOnly, transform } = metadata;
              if (name) {
                v = value[name];
              }
              if (!toInstanceOnly) {
                if (mirror) {
                  const mirrorType = mirror.type(v);
                  if (mirrorType) {
                    o[name || propertyKey] = this.classTransformer.toPlain(
                      mirrorType,
                      v
                    );
                  }
                  if (transform) {
                    o[name || propertyKey] = transform(
                      v,
                      value,
                      propertyMetadata,
                      allMetadata
                    );
                  }
                }
              }
            } else {
              o[propertyKey] = this.classTransformer.instanceToPlain(v);
            }
          });
        } else {
          const type: any = propertyMirror.getDesignType();
          o[propertyKey] = this.classTransformer.toPlain(type, v);
        }
      });
      return o;
    }
    return value;
  };
}
