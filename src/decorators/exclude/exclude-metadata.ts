import { PropertyMetadata } from '@quicker-js/class-decorator';

/**
 * @class ExcludeMetadata
 */
export class ExcludeMetadata<
  T = ExcludeMetadataOption
> extends PropertyMetadata<T> {}

export interface ExcludeMetadataOption {
  readonly toPlainOnly?: boolean;
  readonly toClassOnly?: boolean;
}
