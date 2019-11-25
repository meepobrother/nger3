export type PlanValue = string | number | PlanObject;
export interface PlanObject {
    [key: string]: PlanValue;
    __id: string;
}
export interface FromJson<O extends PlanObject = PlanObject, T = any> {
    fromJson(json: O): T;
}
export interface FromJsonFactory<O extends PlanObject = PlanObject, T = any> extends FromJson<O, T> {
    __id: string;
}
export function isFromJsonFactory(val: any): val is FromJsonFactory {
    return typeof val.__id === 'string';
}
export interface ToJson<O extends PlanObject = PlanObject> {
    toJson(): O;
}
export type IString<T = any> = string;
export type INumber<T = any> = number;
export interface ToString<T> {
    toString(): IString<T>;
}
/**
 * 实现
 * 接口、组合、委托
 */
export interface IDemo extends PlanObject {
    title: string;
}
export class AbsemtractDemo { }

export class Demo extends AbsemtractDemo implements FromJson, ToJson<IDemo>, ToString<Demo> {
    title: string;
    constructor() {
        super();
    }
    fromJson(json: IDemo): Demo {
        this.title = json.title;
        return this;
    }
    toJson(): IDemo {
        return {
            title: this.title,
            __id: this.toString()
        }
    }
    toString(): IString<Demo> {
        return `[Demo]`;
    }
}

export class DemoFactory implements FromJsonFactory<IDemo, Demo> {
    __id: string = `[Demo]`;
    fromJson(json: IDemo): Demo {
        const demo = new Demo();
        Object.keys(json).map(key => {
            if (key === '__id') {
                return;
            }
            const item = json[key];
            if (isFromJsonFactory(item)) {
                (demo as any)[key] = this.fromJson(item as any)
            } else {
                (demo as any)[key] = item;
            }
        });
        demo.title = json.title;
        return demo;
    }
}

export class FactoryManager {
    factoryStore: Map<any, FromJsonFactory> = new Map();
    constructor(factories: FromJsonFactory[]) {
        factories.map(factory => this.factoryStore.set(factory.__id, factory))
    }
    fromJson<T>(json: PlanObject): T {
        const factory = this.factoryStore.get(json.__id);
        if (factory) {
            return factory.fromJson(json)
        }
        throw new Error(`can not found ${json.__id}`)
    }
}

const factory = new FactoryManager([
    new DemoFactory()
])
const demo = factory.fromJson<Demo>({
    title: `demo`,
    __id: `[Demo]`
});
const demo2 = factory.fromJson<Demo>({
    title: `demo2`,
    __id: `[Demo]`
});
const demoToString = demo.toString();
const demoToJson = demo.toJson();
// 远程接收
const demo3 = demo2.fromJson(demoToJson);
debugger;
