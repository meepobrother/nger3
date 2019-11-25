import { createClassDecorator, createPropertyDecorator } from "@nger/decorator";
export interface Plain {
    desc: string;
}
export const PlainMetadataKey = `__PlainMetadataKey__`;
export const Plain = createClassDecorator<Plain>(PlainMetadataKey);

export interface PlainPro {
    isClass?: boolean;
}
export const PlainProMetadataKey = `__PlainProMetadataKey__`
export const PlainPro = createPropertyDecorator<PlainPro>(PlainProMetadataKey)
