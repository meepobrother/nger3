import { Type, IPropertyDecorator } from "@nger/decorator";
import { PlainPro } from "./plain";
export declare function getJsonType(json: any, key?: string): any;
export declare function getPlainPros(type: any): IPropertyDecorator<any, PlainPro>[];
export declare function getPlainDesc(type: any): string | undefined;
export declare function toPlain(instance: any, key?: string): any;
export declare function createPlain(json: any, key?: string): any;
export declare class PlainModuleRef<T> {
    instance: T;
    constructor(instance: T);
    create<T>(json: any, key?: string): T;
    toJson(type: any, key?: string): any;
}
export declare function createPlainModule<T>(type: Type<T>): PlainModuleRef<T>;
