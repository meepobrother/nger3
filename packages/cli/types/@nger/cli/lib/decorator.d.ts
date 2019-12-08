export declare const CommandMetadataKey = "CommandMetadataKey";
export interface CommandOptions {
    name: string;
    desc?: string;
    opts?: {
        noHelp?: boolean;
        isDefault?: boolean;
    };
}
export declare const Command: (opts?: CommandOptions | undefined) => ClassDecorator;
export declare const OptionMetadataKey = "OptionsMetadataKey";
export interface OptionOptions {
    alias: string;
    description?: string;
    defaultValue?: any;
}
export declare const Option: (opt?: OptionOptions | undefined) => PropertyDecorator;
export declare const ActionMetadataKey = "ActionMetadataKey";
export interface ActionOptions {
}
export declare const Action: (opt?: ActionOptions | undefined) => MethodDecorator;
