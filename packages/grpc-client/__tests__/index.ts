import { createClient } from '../lib';
export interface Service1 {
    add(a: number, b: number): number;
}
export interface Demo {
    Service1: Service1
}
const demo = createClient<Demo>({} as any)
demo.Service1.add(1, 2);
