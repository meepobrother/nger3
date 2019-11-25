import { Type } from '@nger3/decorator';
import { InjectionToken } from './token';
export interface AbstractType<T> extends Function { prototype: T; }
export type InjectionString<T> = string & {
    type?: T;
}
export type InjectionNumber<T> = number & {
    type?: T;
}
export type CanInjectable<T> =
    Type<T> |
    InjectionToken<T> |
    InjectionString<T> |
    InjectionNumber<T> |
    AbstractType<T>;