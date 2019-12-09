import { createClassDecorator } from "@nger/decorator";
export interface Injectable { }
export const InjectableMetadataKey = `InjectableMetadataKey`;
export const Injectable = createClassDecorator<Injectable>(InjectableMetadataKey);
