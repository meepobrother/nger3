export abstract class Shape {
    abstract draw(): void;
}
export abstract class ShapeDecorator extends Shape {
    constructor(public readonly shape: Shape) {
        super();
    }
    abstract draw(): void;
}

import { UseDecorator } from '../lib';

export class RedShapeDecorator extends ShapeDecorator {
    draw() {
        console.log(`RedShapeDecorator`)
    }
}
export class BorderShapeDecorator extends ShapeDecorator {
    draw() {
        console.log(`RedShapeDecorator`)
    }
}

@UseDecorator({
    decorators: [
        RedShapeDecorator,
        BorderShapeDecorator
    ]
})
export class Circle extends Shape {
    draw() {
        console.log(`Circle`)
    }
}

