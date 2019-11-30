export declare class Demo {
    title: string;
}
export declare class Demo2 {
    title: string;
    demo: Demo;
}
export declare class Demo3 {
    demo2: Demo2;
    title: string;
    constructor(title: string);
}
export declare class Demo4 {
    demo3: Demo3;
    demos: Demo3[];
    title: string;
}
