import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
export interface StartGrpcOptions {
    url?: string;
    maxSendMessageLength?: number;
    maxReceiveMessageLength?: number;
    credentials?: any;
    protoPath: string;
    package: string;
    loader?: {
        keepCase?: boolean;
        alternateCommentMode?: boolean;
        longs?: Function;
        enums?: Function;
        bytes?: Function;
        defaults?: boolean;
        arrays?: boolean;
        objects?: boolean;
        oneofs?: boolean;
        json?: boolean;
        includeDirs?: string[];
    };
}
export async function startGrpc(module: any, options: StartGrpcOptions) {
    const app = await NestFactory.createMicroservice(module, {
        transport: Transport.GRPC,
        options: {
            ...options
        }
    });
    app.listen(() => {
        console.log(`bootstrap`)
    });
}
