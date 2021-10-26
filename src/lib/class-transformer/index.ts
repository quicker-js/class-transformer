import {
  ClassConstructor,
  ClassMetadata,
  ClassMirror,
} from '@quicker-js/class-decorator';

/**
 * @class ClassTransformer
 */
export class ClassTransformer {
  /**
   * 类型转换 将`plain`转实例`Type`类型.
   * @param Type
   * @param plain
   */
  public plainToInstance<
    T extends Record<string, unknown>,
    C extends ClassConstructor<T>
  >(Type: C, plain: Record<keyof T, unknown>): T {
    const classMirror = ClassMirror.reflect(Type) as ClassMirror<ClassMetadata>;
    if (classMirror) {
      classMirror.getMirror('const');
    }
    const resulst = new Type();
    return resulst;
  }
}
