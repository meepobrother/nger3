#!/usr/bin/env node
import { Command, Option, createPlatform, Action } from './index';
import { Input } from './decorator';

@Command({
    name: 'test',
    desc: `测试1`,
    alias: 't1',
    opts: {}
})
export class TestCommand {
    @Option({
        alias: `t`
    })
    test: string;

    @Input()
    demo: string;
    @Action()
    do() {
        console.log(`hello test: ${this.test}`)
    }
}

@Command({
    name: 'test2',
    desc: `测试2`,
    alias: `t2`,
    opts: {}
})
export class Test2Command {
    @Option({
        alias: 't'
    })
    test: string;

    @Input()
    demo: string;
    @Action()
    do() {
        console.log(`hello test2: ${this.test}`)
    }
}

createPlatform([TestCommand, Test2Command]).run()
