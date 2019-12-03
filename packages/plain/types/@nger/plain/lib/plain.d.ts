import { Type } from "@nger/decorator";
export interface Plain {
    desc: string | number | object | (string | number)[];
}
export declare const PlainMetadataKey = "__PlainMetadataKey__";
export declare const Plain: (opts?: Plain | undefined) => ClassDecorator;
export interface PlainPro {
    isClass?: boolean;
    type?: Type<any>;
}
export declare const PlainProMetadataKey = "__PlainProMetadataKey__";
export declare const PlainPro: (opt?: PlainPro | undefined) => PropertyDecorator;
export interface PlainModule {
    imports: Type<any>[];
    providers: Type<any>[];
}
export declare const PlainModuleMetadataKey = "__PlainModuleMetadataKey__";
export declare const PlainModule: (opts?: PlainModule | undefined) => ClassDecorator;
