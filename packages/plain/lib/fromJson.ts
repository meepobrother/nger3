import { Type, clsStore, IClassDecorator, getINgerDecorator, IPropertyDecorator } from "@nger/decorator";
import { PlainMetadataKey, Plain, PlainProMetadataKey, PlainPro } from "./plain";
export function getJsonType(json: any, key: string = `__plain_desc`): any {
    const set = clsStore.get<any>(PlainMetadataKey);
    const type = [...set].find(it => getPlainDesc(it) === (json[key] || json.__plain_desc));
    if (type) return type;
}
export function getPlainPros(type: any): IPropertyDecorator<any, PlainPro>[] {
    const nger = getINgerDecorator(type);
    return nger.properties.filter(it => it.metadataKey === PlainProMetadataKey) || [];
}
export function getPlainDesc(type: any): string | undefined {
    const nger = getINgerDecorator(type);
    const plain = nger.classes.find(it => it.metadataKey === PlainMetadataKey) as IClassDecorator<any, Plain>;
    if (plain) {
        return plain.options.desc;
    }
}
export function toPlain(instance: any, key: string = `__plain_desc`): any {
    if (Array.isArray(instance)) {
        return instance.map(it => toPlain(it, key))
    }
    const type = instance.constructor;
    const obj: any = {};
    getPlainPros(type).map(it => {
        const val = Reflect.get(instance, it.property);
        if (it.options && it.options.isClass) {
            if (val) Reflect.set(obj, it.property, toPlain(val, key))
        } else {
            Reflect.set(obj, it.property, val)
        }
    });
    const desc = getPlainDesc(type);
    Reflect.set(obj, key, desc)
    return obj;
}
export function createPlain(json: any, key: string = `__plain_desc`): any {
    if (Array.isArray(json)) {
        return json.map(it => createPlain(it, key))
    }
    if (Buffer.isBuffer(json)) {
        return Buffer.from(json);
    }
    const type = getJsonType(json, key);
    if (type) {
        const instance = new type();
        getPlainPros(type).forEach(it => {
            let val = Reflect.get(json, it.property);
            if (Buffer.isBuffer(val)) {
                val = Buffer.from(val)
            }
            if (it.options && it.options.isClass) {
                if (val) Reflect.set(instance, it.property, createPlain(val, key))
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
    create<T>(json: any, key: string = `__plain_desc`): T {
        return createPlain(json, key)
    }
    toJson(type: any, key: string = `__plain_desc`) {
        return toPlain(type, key);
    }
}
export function createPlainModule<T>(type: Type<T>): PlainModuleRef<T> {
    const instance = new type();
    return new PlainModuleRef<T>(instance);
}
