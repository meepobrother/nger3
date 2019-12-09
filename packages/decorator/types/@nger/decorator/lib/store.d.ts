import { Type } from "./defs";
export declare class DecoratorStore {
    map: Map<string, Set<any>>;
    set<T = any>(metadataKey: string, val: Type<T>): void;
    get<T>(metadataKey: string): Set<T>;
}
export declare const clsStore: DecoratorStore;
