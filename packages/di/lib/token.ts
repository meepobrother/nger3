export class InjectionToken<T> {
    readonly desc: string;
    constructor(desc: string) {
        this.desc = desc;
    }
}
