import { Type, getINgerDecorator, IClassDecorator, IPropertyDecorator, IMethodDecorator } from '@nger3/decorator';
const pkg = require('../package.json');
import { CommandMetadataKey, CommandOptions, OptionOptions, OptionMetadataKey, ActionMetadataKey, ActionOptions, } from './decorator';
import argv = require('yargs-parser');
export class Platform {
    constructor(public commands: Type<any>[]) { }
    async run(args: string[]) {
        return await createArgs(this.commands)(args)
    }
}
export function createPlatform(commands: Type<any>[]) {
    return new Platform(commands)
}
function createArgs(commands: Type<any>[]) {
    return async (args: string[]) => {
        const argvs = argv(args);
        const _ = argvs._;
        if (_.length > 0) {
            const commandName = _[0];
            const has = commands.find(it => {
                const nger = getINgerDecorator(it);
                const clsDecorator = nger.classes.find(it => it.metadataKey === CommandMetadataKey) as IClassDecorator<any, CommandOptions>;
                const { options: commandOptions } = clsDecorator;
                if (commandOptions.name === commandName) {
                    return true;
                } else {
                    return false;
                }
            });
            if (has) {
                await Promise.all(commands.map(async command => {
                    const nger = getINgerDecorator(command);
                    const clsDecorator = nger.classes.find(it => it.metadataKey === CommandMetadataKey) as IClassDecorator<any, CommandOptions>;
                    const { options: commandOptions } = clsDecorator;
                    if (commandOptions.name === commandName) {
                        const instance = new clsDecorator.type();
                        const options = nger.properties.filter(it => it.metadataKey === OptionMetadataKey) as IPropertyDecorator<any, OptionOptions>[];
                        options.map(option => {
                            Reflect.defineProperty(instance, option.property, {
                                value: Reflect.get(argvs, option.property) || Reflect.get(argvs, option.options.alias) || option.options.defaultValue
                            });
                        });
                        const methods = nger.methods.filter(it => it.metadataKey === ActionMetadataKey) as IMethodDecorator<any, ActionOptions>[];
                        await Promise.all(methods.map(method => {
                            if (method.descriptor) return Reflect.apply(method.descriptor.value, instance, [])
                        }));
                    }
                }));
            } else {
                outputHelp();
            }
        } else {
            outputHelp();
        }
    }
    function outputHelp() {
        console.log(`${pkg.name}:v${pkg.version}`)
        commands.map(command => {
            const nger = getINgerDecorator(command);
            const clsDecorator = nger.classes.find(it => it.metadataKey === CommandMetadataKey) as IClassDecorator<any, CommandOptions>;
            const { options: commandOptions } = clsDecorator;
            console.log(`${commandOptions.name}:${commandOptions.desc}`)
        });
    }
}
