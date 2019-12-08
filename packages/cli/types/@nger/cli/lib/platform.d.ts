import { Type } from '@nger/decorator';
export declare class Platform {
    commands: Type<any>[];
    constructor(commands: Type<any>[]);
    run(args: string[]): Promise<void>;
}
export declare function createPlatform(commands: Type<any>[]): Platform;
