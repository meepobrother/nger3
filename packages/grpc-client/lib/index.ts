import { loadPackageDefinition, credentials } from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import { Observable } from 'rxjs';
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
                    let m = Reflect.get(target, p);
                    return (args: object | Promise<object> | Observable<object>) => {
                        return new Observable((obs) => {
                            const channel = m.bind(target)(args, (err: Error, response: any) => {
                                if (response)
                                    obs.next(response);
                                if (err)
                                    obs.error(err);
                            })
                            channel.on("data", (cd: any) => {
                                obs.next(cd)
                            });
                            channel.on('end', () => {
                                obs.complete()
                            })
                            channel.on(`error`, (err: any) => {
                                obs.error(err)
                            })
                            channel.on(`close`, () => {
                                obs.complete()
                            })
                        })
                    }
                }
            })
        }
    })
}