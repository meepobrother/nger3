export interface Record {
    token: any;
    factory: any;
    kind: any;
}
export class Platform {
    private parent?: Platform;
    private name: string;
    private injects: Map<any, Record> = new Map();
    constructor(name: string, statics: any[], parent?: Platform) {
        this.name = name;
        this.parent = parent;
    }
}
export interface PlatformFactory {
    (staticProvider: any[]): Platform;
}
export function createPlatformFactory(parent: Platform, staticProvider: any[], name: string): PlatformFactory {
    return (providers: any[]) => {
        const platform = new Platform(name, [...staticProvider, ...providers], parent);
        return platform;
    }
}
