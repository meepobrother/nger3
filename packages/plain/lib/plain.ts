import { createClassDecorator, createPropertyDecorator, Type } from "@nger/decorator";
export interface Plain {
    desc: string | number | object | (string | number)[];
}
export const PlainMetadataKey = `__PlainMetadataKey__`;
export const Plain = createClassDecorator<Plain>(PlainMetadataKey, (type: Type<any>) => {
    return {
        desc: type.name
    }
});

export interface PlainPro {
    isClass?: boolean;
    type?: Type<any>;
}
export const PlainProMetadataKey = `__PlainProMetadataKey__`;
export const PlainPro = createPropertyDecorator<PlainPro>(PlainProMetadataKey);

export interface PlainModule {
    imports: any[];
    providers: any[];
}
export const PlainModuleMetadataKey = `__PlainModuleMetadataKey__`;
export const PlainModule = createClassDecorator<PlainModule>(PlainModuleMetadataKey);
