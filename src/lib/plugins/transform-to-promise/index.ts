import { ClassConstructor } from '@quicker-js/class-decorator';
import { BasePlugin } from '../base-plugin';
import { Utils } from '../../utils';
import { TypeMirror } from '../../type-mirror';

/**
 * Transform to Promise
 * @class TransformToPromise
 * @plugin TransformToPromise
 */
export class TransformToPromise extends BasePlugin {
  public static type = Promise;

  public type = Promise;

  public transform = <T extends object>(
    type: ClassConstructor<T> | undefined,
    elementType: TypeMirror | undefined,
    value: any
  ): Promise<any> | undefined => {
    if (Utils.isPromise(value)) {
      return new Promise<any>((resolve, reject) => {
        value
          .then((res: any) => {
            if (elementType) {
              const mirrorType = elementType.type(res);
              resolve(
                mirrorType
                  ? this.classTransformer.transform(
                      mirrorType,
                      elementType.elementType(),
                      res,
                      {
                        scene: this.scene,
                      }
                    )
                  : res
              );
            } else {
              resolve(res);
            }
          })
          .catch((e: any) => reject(e));
      });
    }
  };

  public toPlain = <T = any>(value: any): Promise<T> | undefined => {
    if (Utils.isPromise(value)) {
      return new Promise<T>((resolve, reject) => {
        value
          .then((res: any) => this.classTransformer.instanceToPlain(res))
          .catch((err: any) => reject(err));
      });
    }
  };
}
