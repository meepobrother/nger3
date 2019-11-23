import { Type, getINgerDecorator, IClassDecorator, IPropertyDecorator, IMethodDecorator } from '@nger3/decorator';
const pkg = require('../package.json');
import { CommandMetadataKey, CommandOptions, OptionOptions, OptionMetadataKey, ActionMetadataKey, ActionOptions, } from './decorator';
import argv = require('yargs-parser');
export function createPlatform(commands: Type<any>[]) {
    const argvs = argv(process.argv.slice(2));
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
            commands.map(command => {
                const nger = getINgerDecorator(command);
                const clsDecorator = nger.classes.find(it => it.metadataKey === CommandMetadataKey) as IClassDecorator<any, CommandOptions>;
                const { options: commandOptions } = clsDecorator;
                if (commandOptions.name === commandName) {
                    const instance = new clsDecorator.type();
                    const options = nger.properties.filter(it => it.metadataKey === OptionMetadataKey) as IPropertyDecorator<any, OptionOptions>[];
                    options.map(option => {
                        Reflect.defineProperty(instance, option.property, {
                            value: Reflect.get(argvs, option.property)
                        });
                    });
                    const method = nger.methods.find(it => it.metadataKey === ActionMetadataKey) as IMethodDecorator<any, ActionOptions>;
                    if (method.descriptor) Reflect.apply(method.descriptor.value, instance, [])
                }
            });
        } else {
            outputHelp()
        }
    } else {
        outputHelp()
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
