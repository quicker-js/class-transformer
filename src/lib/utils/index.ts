import { Where } from '../type-mirror';

/**
 * 工具类
 * @class Utils
 */
export class Utils {
  /**
   * 获取对象的所有key
   * @param obj
   */
  public static objectKeys(obj: object): Array<string | symbol> {
    const keys: Array<symbol | string> = [];
    return keys.concat(
      Object.getOwnPropertyNames(obj),
      Object.getOwnPropertySymbols(obj)
    );
  }

  /**
   * Match where
   * @param wheres
   * @param value
   */
  public static where = (wheres: Where[], value: any): boolean => {
    return (
      typeof value === 'object' &&
      value !== null &&
      wheres.some((where) => {
        return Utils.objectKeys(where).every((key) => {
          return value[key] === where[key];
        });
      })
    );
  };

  /**
   * 转换为数字
   * @param value
   */
  public static toNumber = (value: any): number | undefined => {
    if (typeof value === 'number') {
      return value;
    }
    if (value instanceof Number) {
      return Number(value);
    }
    if (
      /^[0-9]+(\.?[0-9]+)?$/.test(value) ||
      /^0x[a-fA-F0-9]+?$/i.test(value)
    ) {
      return Number(value);
    }
  };

  /**
   * 转换为boolean值
   * @param value
   */
  public static toBoolean = (value: any): boolean => {
    if (typeof value === 'boolean') {
      return value;
    }

    if (/^true$/.test(value)) {
      return true;
    }

    if (/^false$/.test(value)) {
      return false;
    }
    return Boolean(value);
  };

  /**
   * 转换为字符串
   * @param value
   */
  public static toString = (value: any): string => {
    if (typeof value === 'string') {
      return value;
    }

    if (value instanceof String) {
      return value.toString();
    }

    if (value === null || value === undefined) {
      return '';
    }

    return String(value);
  };

  /**
   * 转换为正则
   * @param value
   */
  public static toRegexp(value: any): RegExp | undefined {
    if (value instanceof RegExp) {
      return value;
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof String ||
      value instanceof Number
    ) {
      return new RegExp(value.toString());
    }
  }

  /**
   * 转换为symbol
   * @param value
   */
  public static toSymbol(value: any): symbol | undefined {
    if (
      typeof value === 'string' ||
      typeof value === 'undefined' ||
      typeof value === 'number'
    ) {
      return Symbol(value);
    }
  }

  /**
   * 转换日期
   * @param value
   */
  public static toDate = (value: any): Date | undefined => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      value instanceof String ||
      value instanceof Number
    ) {
      return new Date(value.toString());
    }
  };

  /**
   * 转换为函数
   * @param value
   */
  public static toFunction = (value: any): Function | undefined => {
    if (typeof value === 'function') {
      return value;
    }
  };

  public static isPromise = (value: any): boolean => {
    if (value instanceof Promise) {
      return true;
    }
    return (
      typeof value === 'object' &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function' &&
      typeof value.finally === 'function'
    );
  };
}
