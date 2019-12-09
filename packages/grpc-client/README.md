# `@nger/grpc-client`

> 一款简单实用的graphql客户端

```ts
import { createClient } from '@nger/grpc-client';
export interface Service1 {
    add(a: number, b: number): Observable<number>;
}
export interface Demo {
    Service1: Service1
}
const demo = createClient<Demo>({
    protoPath: ``,
    url: ``,
    package: ``
})
demo.Service1.add(1, 2);
```