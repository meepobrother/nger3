import { Command, Option, createPlatform, Action } from '../lib';

@Command({
    name: 'test',
    desc: `测试1`,
    opts: {}
})
export class TestCommand {
    @Option()
    test: string;

    @Action()
    do() {
        console.log(`hello test: ${this.test}`)
    }
}

@Command({
    name: 'test2',
    desc: `测试2`,
    opts: {}
})
export class Test2Command {
    @Option()
    test: string;

    @Action()
    do() {
        console.log(`hello test2: ${this.test}`)
    }
}

createPlatform([TestCommand, Test2Command])
debugger;
