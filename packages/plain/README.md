# `@nger/plain`

> 一款简单的序列化类和初始化类的工具


```ts
import { Plain, PlainPro, createPlain, toPlain, createPlainModule, PlainModule } from '@nger/plain';

@Plain()
export class Demo {
    @PlainPro()
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}
@Plain()
export class Demo2 {
    @PlainPro()
    title: string;
    @PlainPro({
        isClass: true
    })
    demo: Demo[];
}

@PlainModule({
    imports: [],
    providers: [
        Demo2,
        Demo
    ]
})
export class DemoModule { }

const ref = createPlainModule(DemoModule)

const demo4 = new Demo2();
demo4.title = `demo4`;
demo4.demo = [new Demo(`demo1`), new Demo(`demo2`)];

const demo4Plain = ref.toJson(demo4);
const demo5 = ref.create(demo4Plain);

```