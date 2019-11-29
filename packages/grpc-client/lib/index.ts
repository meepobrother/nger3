import { loadPackageDefinition, credentials } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
export interface ClientOptions {
    protoPath: string;
    url: string;
    package: string;
}
export function createClient<T>(options: ClientOptions): T {
    const packageDefinition = loadSync(
        options.protoPath,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        }
    );
    const _pkgDefinition = loadPackageDefinition(packageDefinition);
    const pkg = Reflect.get(_pkgDefinition, options.package);
    return new Proxy(pkg, {
        get: (target: any, p: PropertyKey, receiver: any) => {
            const Client = Reflect.get(target, p)
            const client = new Client(options.url, credentials.createInsecure())
            return new Proxy(client, {
                get: (target: any, p: PropertyKey, receiver: any) => {
                    const m = Reflect.get(target, p);
                    return (args: object) => {
                        return m(args, (err: Error, response: any) => {
                            console.log({
                                args,
                                err,
                                response
                            })
                        })
                    }
                }
            })
        }
    })
}
