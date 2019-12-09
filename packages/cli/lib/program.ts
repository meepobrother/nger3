import { Command, CommanderStatic } from 'commander';
import program from 'commander';
import chalk from 'chalk';
import { Type, getINgerDecorator, IClassDecorator, IPropertyDecorator, IMethodDecorator } from '@nger/decorator';
import { OptionMetadataKey, CommandMetadataKey, ActionMetadataKey, CommandOptions, OptionOptions, ActionOptions, InputMetadataKey, InputOptions } from './decorator';
export function load(typeCommand: Type<any>): void {
    let _program: Command = program;
    const nger = getINgerDecorator(typeCommand);
    const handlers: any[] = [];
    nger.classes.filter(it => it.metadataKey === CommandMetadataKey).map((it: IClassDecorator<any, CommandOptions>) => {
        const options = it.options;
        const input = nger.properties.filter(it => it.metadataKey === InputMetadataKey).map((it: IPropertyDecorator<any, InputOptions>) => {
            return `[${it.options.name}]`
        }).join(' ');
        _program = _program.command(`${options.name} ${input}`)
        if (options.alias) _program = _program.alias(options.alias);
        if (options.desc) _program = _program.description(options.desc)
        nger.properties.filter(it => it.metadataKey === OptionMetadataKey).map((it: IPropertyDecorator<any, OptionOptions>) => {
            const options = it.options;
            const handler = (instance: any, command: Command) => {
                const val = Reflect.get(command, options.alias) || Reflect.get(command, it.property) || Reflect.get(instance, it.property) || options.defaultValue;
                Reflect.set(instance, it.property, val)
            }
            handlers.push(handler);
            const option = `${options.alias ? `-${options.alias}, ` : ``}--${it.property as string} <${it.property as string}>`;
            _program = _program.option(option, options.description, options.defaultValue)
        });
        nger.properties.filter(it => it.metadataKey === InputMetadataKey).map((it: IPropertyDecorator<any, InputOptions>) => {
            const handler = (instance: any, command: Command) => {
                const val = Reflect.get(command, it.options.name) || Reflect.get(instance, it.property)
                Reflect.set(instance, it.property, val)
            }
            handlers.push(handler);
        });
        _program.action(async (arg: string, command: Command) => {
            const instance = new typeCommand();
            handlers.map(handler => {
                handler(instance, command)
            });
            nger.methods.filter(it => it.metadataKey === ActionMetadataKey).map((it: IMethodDecorator<any, ActionOptions>) => {
                const action = Reflect.get(instance, it.property);
                if (action) action.bind(instance)();
            });
        })
    });
}
export const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(
    ' Error ',
);
export function handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
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