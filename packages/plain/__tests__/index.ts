import { Plain, PlainPro, createPlain, toPlain, createPlainModule, PlainModule } from '../lib';

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

debugger;