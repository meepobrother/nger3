import { Plain, PlainPro, createPlain, toPlain } from '../lib';

@Plain({
    desc: `demo`
})
export class Demo {
    @PlainPro()
    title: string;
}
@Plain({
    desc: `demo2`
})
export class Demo2 {

    @PlainPro()
    title: string;

    @PlainPro({
        isClass: true
    })
    demo: Demo;
}
@Plain({
    desc: `demo3`
})
export class Demo3 {
    @PlainPro({
        isClass: true
    })
    demo2: Demo2;

    @PlainPro()
    title: string;
    constructor(title: string) {
        this.title = title;
    }
}
@Plain({
    desc: `demo4`
})
export class Demo4 {
    @PlainPro({
        isClass: true
    })
    demo3: Demo3;

    @PlainPro({
        isClass: true,
        type: Demo3
    })
    demos: Demo3[];

    @PlainPro()
    title: string;
}

const demo4 = new Demo4();
demo4.title = `demo4`;
demo4.demo3 = new Demo3(`demo1`);
demo4.demos = [new Demo3(`demo2`), new Demo3(`demo3`)];
demo4.demo3.title = `demo3`;
demo4.demo3.demo2 = new Demo2();
demo4.demo3.demo2.title = `demo2`;
demo4.demo3.demo2.demo = new Demo();
demo4.demo3.demo2.demo.title = `demo`;

const demo4Plain = toPlain(demo4)

const demo5 = createPlain(demo4Plain);

debugger;