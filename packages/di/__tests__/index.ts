import { Injectable } from '../lib';


@Injectable()
export class Demo { }


@Injectable()
export class Demo2 {
    constructor(public demo: Demo) { }
}
