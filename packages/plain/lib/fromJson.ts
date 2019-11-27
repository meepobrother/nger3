import { clsStore, IClassDecorator, getINgerDecorator, IPropertyDecorator } from "@nger/decorator";
import { PlainMetadataKey, Plain, PlainProMetadataKey, PlainPro } from "./plain";
import { Type } from "@nestjs/common";
export function getJsonType(json: any): any {
    const set = clsStore.get<any>(PlainMetadataKey);
    const type = [...set].find(it => getPlainDesc(it) === json.__plain_desc);
    if (type) return type;
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
        const val = Reflect.get(instance, it.property);
        if (it.options && it.options.isClass) {
            if (val) Reflect.set(obj, it.property, toPlain(val))
        } else {
            Reflect.set(obj, it.property, val)
        }
    });
    const desc = getPlainDesc(type);
    Reflect.set(obj, `__plain_desc`, desc)
    return obj;
}
export function createPlain(json: any) {
    const type = getJsonType(json);
    if (type) {
        const instance = new type();
        getPlainPros(type).forEach(it => {
            let val = Reflect.get(json, it.property);
            if (Buffer.isBuffer(val)) {
                val = Buffer.from(val)
            }
            if (it.options && it.options.isClass) {
                if (val) Reflect.set(instance, it.property, createPlain(val))
            } else {
                Reflect.set(instance, it.property, val);
            }
        });
        return instance;
    }
    return json;
}
export class PlainModuleRef<T> {
    instance: T;
    constructor(instance: T) {
        this.instance = instance;
    }
    create<T>(json: any): T {
        return createPlain(json)
    }
    toJson(type: Type<any>) {
        return toPlain(type);
    }
}
export function createPlainModule<T>(type: Type<T>): PlainModuleRef<T> {
    const instance = new type();
    return new PlainModuleRef<T>(instance);
}
