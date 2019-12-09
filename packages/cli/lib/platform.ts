import { Type } from '@nger/decorator';
import commander from 'commander';
import { CommanderStatic } from 'commander';
import { load, handleInvalidCommand } from './program';

export class Platform {
    constructor(public commands: Type<any>[]) { }
    async run() {
        return bootstrap(this.commands)
    }
}

export function createPlatform(commands: Type<any>[]) {
    return new Platform(commands)
}

export function bootstrap(commands: Type<any>[]) {
    const program: CommanderStatic = commander;
    program
        .version(require('../package.json').version)
        .usage('<command> [options]');
    const loadder = load(program);
    commands.map(command => loadder(command));
    handleInvalidCommand(program)
    commander.parse(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}
