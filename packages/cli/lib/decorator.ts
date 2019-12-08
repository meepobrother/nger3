import { createClassDecorator, createPropertyDecorator, createMethodDecorator } from '@nger/decorator';
export const CommandMetadataKey = `CommandMetadataKey`;
export interface CommandOptions {
    name: string;
    desc?: string;
    opts?: {
        noHelp?: boolean;
        isDefault?: boolean;
    };
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
