import { Type } from '@nger/decorator';
export * from './decorator';
export function decode<T>(type: Type<T>, buffer: Buffer): T {
    return (type as any).$type.decode(buffer);
}
export function encode<T>(instance: T): Buffer {
    const type = (instance as any).constructor.$type;
    return type.encode(instance).finish()
}
