import { CanInjectable } from "./types";

export function inject<T>(token: CanInjectable<T>): T {
    return {} as T;
}
