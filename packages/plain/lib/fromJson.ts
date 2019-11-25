import { clsStore, IClassDecorator, getINgerDecorator, IPropertyDecorator } from "@nger/decorator";
import { PlainMetadataKey, Plain, PlainProMetadataKey, PlainPro } from "./plain";
export function getJsonType(json: any): any {
    const set = clsStore.get<any>(PlainMetadataKey);
    const type = [...set].find(it => getPlainDesc(it) === json.__plain_desc);
    if (type) return type;
    throw new Error(`can not found type ${json.__plain_desc}`)
}
export function getPlainPros(type: any): IPropertyDecorator<any, PlainPro>[] {
    const nger = getINgerDecorator(type);
    return nger.properties.filter(it => it.metadataKey === PlainProMetadataKey) || [];
}
export function getPlainDesc(type: any): string {
    const nger = getINgerDecorator(type);
    const plain = nger.classes.find(it => it.metadataKey === PlainMetadataKey) as IClassDecorator<any, Plain>;
    if (plain) {
        return plain.options.desc;
    }
    throw new Error(`can not found plain ${type.name}`)
}
export function toPlain(instance: any) {
    const type = instance.constructor;
    const obj: any = {};
    getPlainPros(type).map(it => {
        if (it.options && it.options.isClsss) {
            Reflect.set(obj, it.property, toPlain(Reflect.get(instance, it.property)))
        } else {
            Reflect.set(obj, it.property, Reflect.get(instance, it.property))
        }
    });
    const desc = getPlainDesc(type);
    Reflect.set(obj, `__plain_desc`, desc)
    return obj;
}
export function createPlain(json: any) {
    const type = getJsonType(json);
    const instance = new type();
    getPlainPros(type).forEach(it => {
        if (it.options && it.options.isClsss) {
            Reflect.set(instance, it.property, createPlain(Reflect.get(json, it.property)))
        } else {
            Reflect.set(instance, it.property, Reflect.get(json, it.property))
        }
    });
    return instance;
}
