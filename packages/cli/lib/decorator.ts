import { createClassDecorator, createPropertyDecorator, createMethodDecorator, Type } from '@nger3/decorator';
import { CommandOptions as ICommandOptions } from 'commander';
export const CommandMetadataKey = `CommandMetadataKey`;
export interface CommandOptions {
    name: string;
    desc?: string;
    opts?: ICommandOptions;
}
export const Command = createClassDecorator<CommandOptions>(CommandMetadataKey);

export const OptionMetadataKey = `OptionsMetadataKey`;
export interface OptionOptions {
    alias: string;
    description?: string;
    defaultValue?: any;
}
export const Option = createPropertyDecorator<OptionOptions>(OptionMetadataKey);

export const ActionMetadataKey = `ActionMetadataKey`;
export interface ActionOptions { }
export const Action = createMethodDecorator<ActionOptions>(ActionMetadataKey);


export const UseDecoratorMetadataKey = `UseDecoratorMetadataKey`;
export interface UseDecorator {
    decorators: Type<any>[];
}
export const UseDecorator = createClassDecorator<UseDecorator>(UseDecoratorMetadataKey)
