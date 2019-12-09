import { Type } from '@nger/decorator';
export declare class Platform {
    commands: Type<any>[];
    constructor(commands: Type<any>[]);
    run(): Promise<void>;
}
export declare function createPlatform(commands: Type<any>[]): Platform;
export declare function bootstrap(commands: Type<any>[]): void;
