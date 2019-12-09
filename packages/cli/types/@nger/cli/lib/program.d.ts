import { CommanderStatic } from 'commander';
import { Type } from '@nger/decorator';
export declare function load(typeCommand: Type<any>): void;
export declare const ERROR_PREFIX: string;
export declare function handleInvalidCommand(program: CommanderStatic): void;
