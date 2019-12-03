import { Type, clsStore, IClassDecorator, getINgerDecorator, IPropertyDecorator } from "@nger/decorator";
import { PlainMetadataKey, Plain, PlainProMetadataKey, PlainPro } from "./plain";
export function getJsonType(json: any, key: string = `__plain_desc`): any {
    const set = clsStore.get<any>(PlainMetadataKey);
    const type = [...set].find(it => {
        return hasPlainDesc(it, (json[key] || json.__plain_desc), json)
    });
    if (type) return type;
}
export function hasPlainDesc(it: any, val: any, json: any) {
    const plainDesc: any = getPlainDesc(it);
    if (Array.isArray(plainDesc)) {
        return plainDesc.includes(val)
    }
    if (typeof plainDesc === 'object') {
        return Object.keys(plainDesc).every(key => {
            return plainDesc[key] === json[key]
        })
    }
    return plainDesc === val;
}
export function getPlainPros(type: any): IPropertyDecorator<any, PlainPro>[] {
    const nger = getINgerDecorator(type);
    return nger.properties.filter(it => it.metadataKey === PlainProMetadataKey) || [];
}
export function getPlainDesc(type: any): string | number | object | (string | number)[] | undefined {
    const nger = getINgerDecorator(type);
    const plain = nger.classes.find(it => it.metadataKey === PlainMetadataKey) as IClassDecorator<any, Plain>;
    if (plain) {
        return plain.options.desc;
    }
}
export function toPlain(instance: any, key: string = `__plain_desc`, handler?: (source: IPropertyDecorator<any, PlainPro>, target: any) => any): any {
    if (Array.isArray(instance)) {
        return instance.map(it => toPlain(it, key, handler))
    }
    const type = instance.constructor;
    const obj: any = {};
    getPlainPros(type).map(it => {
        const val = Reflect.get(instance, it.property);
        if (handler) {
            const res = handler(it, val);
            Reflect.set(obj, it.property, res)
        } else {
            if (it.options && it.options.isClass) {
                if (val) Reflect.set(obj, it.property, toPlain(val, key, handler))
            } else {
                Reflect.set(obj, it.property, val)
            }
        }
    });
    const desc: any = getPlainDesc(type);
    if (typeof desc === 'object') {
        return {
            ...obj,
            ...desc
        }
    } else {
        const old = Reflect.get(obj, key);
        if (Array.isArray(desc)) {
            if (desc.includes(old)) {
                return obj;
            }
            throw new Error(`${old} not in [${desc.join(',')}]`)
        }
        Reflect.set(obj, key, desc);
    }
    return obj;
}
export function createPlain(json: any, key: string = `__plain_desc`, handler?: (source: any, target: any) => any): any {
    if (Array.isArray(json)) {
        return json.map(it => createPlain(it, key, handler))
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
                if (val) Reflect.set(instance, it.property, createPlain(val, key, handler))
            } else {
                Reflect.set(instance, it.property, val);
            }
        });
        handler && handler(json, instance);
        return instance;
    }
    return json;
}
export class PlainModuleRef<T> {
    instance: T;
    constructor(instance: T) {
        this.instance = instance;
    }
    create<T>(json: any, key: string = `__plain_desc`, handler?: (source: any, target: any) => any): T {
        return createPlain(json, key, handler)
    }
    toJson(type: any, key: string = `__plain_desc`, handler?: (source: any, target: any) => any) {
        return toPlain(type, key, handler);
    }
}
export function createPlainModule<T>(type: Type<T>): PlainModuleRef<T> {
    const instance = new type();
    return new PlainModuleRef<T>(instance);
}
