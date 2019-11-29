import * as d from "@nger/decorator";
import * as proto from 'protobufjs';
export { Message } from 'protobufjs';
import Long from 'long';
export interface Constructor<T> extends Function {
    new(...params: any[]): T;
    prototype: T;
}
export type FieldRule = "optional" | "required" | "repeated";
export interface Field1<T extends proto.Message<T> = any> {
    fieldId?: number;
    fieldType?: Constructor<T> | string;
    fieldRule?: "optional" | "required" | "repeated";
}
export interface Field2<T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[] = any> {
    fieldId?: number;
    fieldType?: "double" | "float" | "int32" | "uint32" | "sint32" | "fixed32" | "sfixed32" | "int64" | "uint64" | "sint64" | "fixed64" | "sfixed64" | "string" | "bool" | "bytes" | object;
    fieldRule?: "optional" | "required" | "repeated";
    defaultValue?: T;
}
export function isField1(val: any): val is Field1 {
    if (val.defaultValue) {
        return false;
    }
    if (typeof val.fieldType === 'function') {
        return true;
    }
    if (typeof val.fieldType === 'string') {
        if (["double", "float", "int32", "uint32", "sint32", "fixed32", "sfixed32", "int64", "uint64", "sint64", "fixed64", "sfixed64", "string", "bool", "bytes"].indexOf(val.fieldType) === -1) {
            return false;
        }
    }
    if (typeof val.fieldType === 'object') {
        return false;
    }
    return true;
}
export type Field = Field1 | Field2;
export const FieldMetadataKey = `__FieldMetadataKey__`;
export class Int32 extends Number { }
export class Float extends Number {
    valueOf() {
        return parseFloat(this.toPrecision(6));
    }
}
export class Double extends Number {
    valueOf() {
        return parseFloat(this.toPrecision(15));
    }
}
export class Bool extends Boolean { }
export class Bytes extends Buffer { }
export class Uint32 extends Number { }
export class Sint32 extends Number { }
export class Fixed32 extends Number { }
export class Sfixed32 extends Number { }
export class Uint64 extends Number { }
export class Int64 extends Number { }
export class Sint64 extends Number { }
export class Fixed64 extends Number { }
export class Sfixed64 extends Number { }
function getTypeOf(type: any) {
    switch ((type.name as string).toLowerCase()) {
        case 'string':
            return `string`;
        case 'double':
            return 'double';
        case 'float':
            return 'float';
        case 'int32':
            return 'int32';
        case 'uint32':
            return 'uint32';
        case 'sint32':
            return 'sint32';
        case 'fixed32':
            return 'fixed32';
        case 'sfixed32':
            return 'sfixed32';
        case 'int64':
            return 'int64';
        case 'uint64':
            return 'uint64';
        case 'uint64':
            return 'uint64';
        case "sint64":
            return 'sint64';
        case "fixed64":
            return 'fixed64';
        case "sfixed64":
            return 'sfixed64';
        case "string":
            return 'string';
        case "bool":
            return 'bool';
        case "bytes":
            return 'bytes';
        case "boolean":
        case 'bool':
            return 'bool';
        default:
            return type;
    }
}

export const Field = d.createPropertyDecorator<Field>(
    FieldMetadataKey,
    (target: d.Type<any>, instance: any, property: d.TypeProperty, propertyType: any) => {
        let val = Reflect.get(target, '__index__');
        if (typeof val === 'number') {
            val = val + 1;
        } else {
            val = 0;
        }
        Reflect.set(target, '__index__', val);
        return {
            fieldId: val,
            fieldType: getTypeOf(propertyType),
            fieldRule: 'optional'
        }
    },
    (options: Field, target, instance, property) => {
        if (isField1(options)) {
            proto.Field.d(options.fieldId || 0, options.fieldType as any, options.fieldRule)(instance, property as string)
        } else {
            proto.Field.d(options.fieldId || 0, options.fieldType as any, options.fieldRule, options.defaultValue)(instance, property as string)
        }
    });

export interface MapField {
    fieldId?: number;
    fieldKeyType: "int32" | "uint32" | "sint32" | "fixed32" | "sfixed32" | "int64" | "uint64" | "sint64" | "fixed64" | "sfixed64" | "bool" | "string",
    fieldValueType: "double" | "float" | "int32" | "uint32" | "sint32" | "fixed32" | "sfixed32" | "int64" | "uint64" | "sint64" | "fixed64" | "sfixed64" | "bool" | "string" | "bytes" | object | Constructor<{}>;
}
export const MapFieldMetadataKey = `__MapFieldMetadataKey__`
export const MapField = d.createPropertyDecorator<MapField>(
    MapFieldMetadataKey,
    (target: d.Type<any>, instance: any, property: d.TypeProperty) => {
        let val = Reflect.get(target, '__index__');
        if (typeof val === 'number') {
            val = val + 1;
        } else {
            val = 0;
        }
        Reflect.set(target, '__index__', val);
        return {
            fieldId: val,
            fieldKeyType: 'string',
            fieldValueType: 'string'
        }
    },
    (options: MapField, target, instance, property) => {
        proto.MapField.d(options.fieldId || 0, options.fieldKeyType, options.fieldValueType)(instance, property as string)
    }
)

export interface OneOf {
    values: string[];
}
export const OneOfMetadataKey = `__OneOfMetadataKey__`;
export const OneOf = d.createPropertyDecorator<OneOf>(OneOfMetadataKey,
    (target: d.Type<any>, instance: any, property: d.TypeProperty) => {
        return {
            values: []
        } as OneOf;
    }, (options: OneOf, target, instance, property) => {
        proto.OneOf.d(...options.values)(instance, property as string)
    });

export interface Type {
    typeName: string;
}
export const TypeMetadataKey = `__TypeMetadataKey__`;
export const Type = d.createClassDecorator<Type>(TypeMetadataKey, (target: any) => ({
    typeName: target.name
}), (options: Type, target: any) => {
    proto.Type.d(options.typeName)(target);
});
