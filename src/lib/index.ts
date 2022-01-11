import { TypeMirror } from './type-mirror';

export const STRING = TypeMirror.createObjectMirror(String);

export const NUMBER = TypeMirror.createObjectMirror(Number);

export const DATE = TypeMirror.createObjectMirror(Date);

export const REGEXP = TypeMirror.createObjectMirror(RegExp);

export const FUNCTION = TypeMirror.createObjectMirror(Function);

export const SYMBOL = TypeMirror.createObjectMirror(Symbol);

export const ARRAY = TypeMirror.createObjectMirror(Array);

export const SET = TypeMirror.createObjectMirror(Set);

export const MAP = TypeMirror.createObjectMirror(Map);

export const PROMISE = TypeMirror.createObjectMirror(Promise);

export * from './class-transformer';
export * from './utils';
export * from './type-mirror';
export * from './metadatas';
