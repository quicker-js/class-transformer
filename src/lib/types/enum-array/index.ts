/**
 * 枚举类型
 */
export class EnumArray<
  T extends string | number | symbol | Function =
    | string
    | number
    | symbol
    | Function
> extends Array<T> {}
