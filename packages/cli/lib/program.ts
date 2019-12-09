import { Command, CommanderStatic } from 'commander';
import chalk from 'chalk';
import { Type, getINgerDecorator, IClassDecorator, IPropertyDecorator, IMethodDecorator } from '@nger/decorator';
import { OptionMetadataKey, CommandMetadataKey, ActionMetadataKey, CommandOptions, OptionOptions, ActionOptions, InputMetadataKey, InputOptions } from './decorator';
export function load(program: CommanderStatic): (command: Type<any>) => void {
    return (command: Type<any>) => {
        let _program: Command = program;
        const nger = getINgerDecorator(command);
        const handlers: any[] = [];
        nger.classes.filter(it => it.metadataKey === CommandMetadataKey).map((it: IClassDecorator<any, CommandOptions>) => {
            const options = it.options;
            const input = nger.properties.filter(it => it.metadataKey === InputMetadataKey).map((it: IPropertyDecorator<any, InputOptions>) => {
                return `[${it.options.name}]`
            }).join(' ');
            _program = _program.command(`${options.name} ${input}`, options.desc, options.opts)
        });
        nger.properties.filter(it => it.metadataKey === OptionMetadataKey).map((it: IPropertyDecorator<any, OptionOptions>) => {
            const options = it.options;
            const handler = (instance: any, command: Command) => {
                const val = Reflect.get(command, options.alias) || Reflect.get(command, it.property) || Reflect.get(instance, it.property) || options.defaultValue;
                Reflect.set(instance, it.property, val)
            }
            handlers.push(handler);
            _program = _program.option(options.alias, options.description, options.defaultValue)
        });
        nger.properties.filter(it => it.metadataKey === InputMetadataKey).map((it: IPropertyDecorator<any, InputOptions>) => {
            const handler = (instance: any, command: Command) => {
                const val = Reflect.get(command, it.options.name) || Reflect.get(instance, it.property)
                Reflect.set(instance, it.property, val)
            }
            handlers.push(handler);
        });
        _program = _program.action(async (...args: any[]) => {
            const com = args.pop();
            const instance = new command();
            handlers.map(handler => {
                handler(instance, com)
            });
            nger.methods.filter(it => it.metadataKey === ActionMetadataKey).map((it: IMethodDecorator<any, ActionOptions>) => {
                const action = Reflect.get(instance, it.property);
                if (action) action.bind(instance)();
            });
        })
    }
}
export const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(
    ' Error ',
);
export function handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
        console.log({
            args: program.args
        })
        console.error(
            `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
            program.args.join(' '),
        );
        console.log(
            `See ${chalk.red('--help')} for a list of available commands.\n`,
        );
        process.exit(1);
    });
}