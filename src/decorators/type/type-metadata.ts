import {
  ClassConstructor,
  PropertyMetadata,
} from '@quicker-js/class-decorator';

/**
 * @class TypeMetadata
 * Type装饰器的元数据类
 */
export class TypeMetadata<
  C extends ClassConstructor,
  T = TypeMetadataOption<C>
> extends PropertyMetadata<T> {
  /**
   * 构造函数
   * @param type
   * @param metadata
   */
  public constructor(public type: C | undefined, metadata: T) {
    super(metadata);
  }
}

export interface TypeMetadataOption<T extends ClassConstructor> {
  readonly constructor?: T;
  readonly discriminator?: Discriminator;
}

interface Discriminator {
  readonly property: string | symbol;
  subTypes: SubTypes;
}

type SubTypes =
  | Array<{
      value: ClassConstructor;
      name: string | symbol;
    }>
  | Map<string | symbol, ClassConstructor>;
