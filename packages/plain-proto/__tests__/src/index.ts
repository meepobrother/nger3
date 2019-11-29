import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
interface DemoResult {
    title: string;
}
export class Int64 extends Number { }
@Controller()
export class Demo {
    @GrpcMethod()
    do(id: number): DemoResult {
        return {
            title: ``
        };
    }

    @GrpcMethod()
    do1(id: Int64): DemoResult {
        return {
            title: ``
        };
    }
}
