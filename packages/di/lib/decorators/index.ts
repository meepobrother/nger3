import { createClassDecorator } from "@nger3/decorator";
export interface Injectable { }
export const InjectableMetadataKey = `InjectableMetadataKey`;
export const Injectable = createClassDecorator<Injectable>(InjectableMetadataKey);
