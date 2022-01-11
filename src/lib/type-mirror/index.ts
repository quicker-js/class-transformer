import { ClassConstructor } from '@quicker-js/class-decorator';
import { TypedConstructorType } from '../metadatas';
import { Utils } from '../utils';

/**
 * @abstract TypeMirror<T>
 */
export class TypeMirror<
  T extends object = any,
  E extends TypeMirror | undefined = any
> {
  /**
   * array mirror
   * @param type
   */
  public static createArrayMirror = (
    type: TypeMirror | TypedConstructorType | ClassConstructor
  ): TypeMirror => {
    return new TypeMirror(
      () => Array,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  };

  /**
   * object mirror
   * @param type
   */
  public static createObjectMirror = (
    type: TypedConstructorType | ClassConstructor
  ): TypeMirror => {
    return new TypeMirror(
      () => type,
      () => undefined
    );
  };

  /**
   * create Mirror
   * @param type
   * @param elementType
   */
  public static from = <T extends TypedConstructorType | ClassConstructor>(
    type: () => T,
    elementType?: () => TypeMirror
  ): TypeMirror => {
    return new TypeMirror(
      type,
      elementType ? elementType : (): undefined => undefined
    );
  };

  /**
   * where mirror
   * @param wheres
   */
  public static createWhereMirror = (...wheres: WhereType[]): TypeMirror => {
    return new TypeMirror(
      (value: any) => {
        const find = wheres.find((o) => Utils.where(o.wheres, value));
        if (find) {
          return find.subType;
        }
      },
      () => undefined
    );
  };

  /**
   * set mirror
   * @param type
   */
  public static createSetMirror(
    type: TypeMirror | TypedConstructorType | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Set,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * map mirror
   * @param type
   */
  public static createMapMirror(
    type: TypeMirror | TypedConstructorType | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Map,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * promise mirror
   * @param type
   */
  public static createPromiseMirror(
    type: TypeMirror | TypedConstructorType | ClassConstructor
  ): TypeMirror {
    return new TypeMirror(
      () => Promise,
      () =>
        type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type)
    );
  }

  /**
   * constructor
   * @param type
   * @param elementType
   */
  public constructor(
    public type: (
      values?: any
    ) => ClassConstructor<T> | SymbolConstructor | undefined,
    public elementType: () => E
  ) {}
}

export interface WhereType {
  subType: TypedConstructorType | ClassConstructor;
  wheres: Where[];
}

export type Where = Record<PropertyKey, any>;
