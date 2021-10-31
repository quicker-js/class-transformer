import { PropertyMetadata } from '@quicker-js/class-decorator';
import { Flag, FlagDiscriminator, SubTypeDiscriminator } from '../../lib';

/**
 * @class TypeMetadata
 * Type装饰器的元数据类
 */
export class TypeMetadata<T = TypeMetadataOption> extends PropertyMetadata<T> {}

export type TypeMetadataOption =
  | TypeMetadataFlagOption
  | TypeMetadataSubTypeOption
  | TypeMetadataTypeOption;

export interface OwnTypeMetadataOption {
  readonly title?: string;
  readonly description?: string;
  readonly format?: string;
}

export interface TypeMetadataFlagOption extends OwnTypeMetadataOption {
  readonly flags?: Map<Flag, FlagDiscriminator>;
  readonly subTypes?: never;
  readonly type?: never;
}

export interface TypeMetadataSubTypeOption extends OwnTypeMetadataOption {
  readonly flags?: never;
  readonly subTypes?: SubTypeDiscriminator[];
  readonly type?: never;
}

export interface TypeMetadataTypeOption extends OwnTypeMetadataOption {
  readonly flags?: never;
  readonly subTypes?: never;
  readonly type?: Function;
}
