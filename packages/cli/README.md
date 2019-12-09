# `@nger/cli`

> 一款装饰器风格的命令行工具

1. Command 装饰器
3. Option 装饰器
4. Action 装饰器

命令： Cli Command [Option] Action;

## Usage

```ts
#!/usr/bin/env node
import { Command, Option, createPlatform, Action, Input } from '@nger/cli';

@Command({
    name: 'test',
    desc: `测试1`,
    alias: 't1'
})
export class TestCommand {
    @Option({
        alias: `t`
    })
    test: string;

    @Action()
    do() {
        console.log(`hello test: ${this.test}`)
    }
}

@Command({
    name: 'test2',
    desc: `测试2`,
    alias: `t2`
})
export class Test2Command {
    @Option({
        alias: 't'
    })
    test: string;

    @Action()
    do() {
        console.log(`hello test2: ${this.test}`)
    }
}
createPlatform([TestCommand, Test2Command]).run()
```
