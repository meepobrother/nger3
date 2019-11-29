export interface ClientOptions {
    protoPath: string;
    url: string;
    package: string;
}
export declare function createClient<T>(options: ClientOptions): T;
