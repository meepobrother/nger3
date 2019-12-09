import { createClassDecorator, createPropertyDecorator, createMethodDecorator, Type, TypeProperty } from '@nger/decorator';

export const CommandMetadataKey = `CommandMetadataKey`;
export interface CommandOptions {
    name: string;
    alias?: string;
    desc?: string;
    opts?: {
        noHelp?: boolean;
        isDefault?: boolean;
    };
}
export const Command = createClassDecorator<CommandOptions>(CommandMetadataKey, (target: any) => {
    return {
        name: target.name
    }
});

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

export const InputMetadataKey = `InputMetadataKey`
export interface InputOptions {
    name: string;
}

export const Input = createPropertyDecorator<InputOptions>(InputMetadataKey, (target: Type<any>, instance: any, property: TypeProperty, propertyType: any) => {
    return {
        name: property as string
    }
});
