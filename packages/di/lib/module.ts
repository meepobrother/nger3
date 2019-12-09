import { Type } from '@nger/decorator';
export abstract class Injector {
    abstract get<T>(token: any): T;
}
export abstract class NgModuleRef<T> {
    abstract get injector(): Injector;
    abstract get instance(): T;
    abstract destroy(): void;
    abstract onDestroy(callback: () => void): void;
}
export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
}
export abstract class NgModuleFactory<T> {
    abstract get moduleType(): Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}
export interface CompilerOptions { }
export interface BootstrapOptions { }
export abstract class Compiler {
    readonly compilerOptions: CompilerOptions;
    abstract compile<M>(moduleType: Type<M>): NgModuleFactory<M>;
}
export abstract class PlatformRef {
    abstract bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions): Promise<NgModuleRef<M>>;
    abstract bootstrapModule<M>(
        moduleType: Type<M>,
        compilerOptions: CompilerOptions
    ): Promise<NgModuleRef<M>>;
    abstract onDestroy(callback: () => void): void;
    abstract get injector(): Injector;
    abstract destroy(): void;
    abstract get destroyed(): boolean;
}