export declare type TypeProperty = string | symbol;
interface ClassOptions<T, O> {
    (target: Type<T>): O;
}
interface PropertyOptions<T, O> {
    (target: Type<T>, instance: T, property: TypeProperty, propertyType: any): O;
}
interface ParameterOptions<T, O> {
    (target: Type<T>, instance: T, property: TypeProperty | undefined, parameterIndex: number): O;
}
interface MethodOptions<T, O> {
    (target: Type<T>, instance: T, property: TypeProperty, descriptor: TypedPropertyDescriptor<any>): O;
}
export declare type GetOptions<T = any, O = any> = ClassOptions<T, O> | PropertyOptions<T, O> | ParameterOptions<T, O> | MethodOptions<T, O>;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare class INgerDecorator<T = any, O = any> {
    private _classes;
    private _properties;
    private _constructors;
    private _methods;
    get classes(): IClassDecorator<any, any>[];
    get methods(): IMethodDecorator<any, any>[];
    get properties(): IPropertyDecorator<any, any>[];
    get constructors(): IConstructorDecorator<any, any>[];
    constructor();
    addClass(type: Type<T>, options: O, metadataKey: string, params: any[]): void;
    addProperty(property: TypeProperty, instance: T, type: Type<T>, options: any, propertyType: any, metadataKey: string): void;
    addConstructor(type: Type<T>, parameterIndex: number, options: any, parameterTypes: any[], metadataKey: string): void;
    addMethod(property: TypeProperty, instance: T, type: Type<T>, descriptor: TypedPropertyDescriptor<any>, options: any, returnType: any, paramTypes: any[], metadataKey: string): void;
    addMethodParameter(instance: T, type: Type<T>, property: TypeProperty, parameterIndex: number, options: any, parameterTypes: any, metadataKey: string): void;
    private __getMethod;
}
export declare class IClassDecorator<T = any, O = any> {
    private _type;
    private _options;
    private _metadataKey;
    private _params;
    get options(): O;
    get type(): Type<T>;
    get metadataKey(): string;
    get parameters(): any[];
    constructor(type: Type<T>, options: O, metadataKey: string, params: any);
}
export declare class IConstructorDecorator<T = any, O = any> {
    private _type;
    private _options;
    private _parameterIndex;
    private _parameterTypes;
    private _parameterType;
    get type(): Type<T>;
    get options(): O;
    get parameterIndex(): number;
    get parameterType(): any;
    private _metadataKey;
    get metadataKey(): string;
    constructor(type: Type<T>, parameterIndex: number, options: O, parameterTypes: any[], metadataKey: string);
    setParamterType(type: any): void;
}
export declare class IParameterDecorator<T = any, O = any> {
    private _instance;
    private _type;
    private _property;
    private _parameterIndex;
    private _options;
    private _parameterTypes;
    get instance(): T;
    get type(): Type<T>;
    get property(): string | symbol;
    get parameterIndex(): number;
    get options(): O;
    get parameterType(): any;
    private _metadataKey;
    get metadataKey(): string;
    constructor(instance: T, type: Type<T>, property: TypeProperty, parameterIndex: number, options: O, parameterTypes: any[], metadataKey: string);
}
export declare class IPropertyDecorator<T = any, O = any> {
    private _property;
    private _instance;
    private _type;
    private _options;
    private _propertyType;
    get property(): string | symbol;
    get instance(): T;
    get type(): Type<T>;
    get options(): O;
    get propertyType(): any;
    private _metadataKey;
    get metadataKey(): string;
    constructor(property: TypeProperty, instance: T, type: Type<T>, options: O, propertyType: any, metadataKey: string);
}
export declare class IMethodDecorator<T = any, O = any> {
    private _property;
    private _instance;
    private _type;
    private _descriptor;
    private _options;
    private _parameters;
    private _returnType;
    private _paramTypes;
    get returnType(): any;
    get paramTypes(): any[];
    get parameters(): IParameterDecorator<any, any>[];
    get options(): O;
    get descriptor(): TypedPropertyDescriptor<any> | undefined;
    get type(): Type<T>;
    get instance(): T;
    get property(): string | symbol;
    private _metadataKey;
    get metadataKey(): string;
    constructor(property: string | symbol, instance: T, type: Type<T>, descriptor: TypedPropertyDescriptor<any> | undefined, metadataKey: string);
    setDescriptor(descriptor: TypedPropertyDescriptor<any>): void;
    setReturnType(returnType: any): void;
    setParamTypes(paramTypes: any[]): void;
    setOptions(options: O): void;
    addParameter(instance: T, type: Type<T>, property: TypeProperty, parameterIndex: number, options: any, parameterTypes: any[], metadataKey: string): void;
}
export declare function getINgerDecorator<T = any, O = any>(type: Type<T>): INgerDecorator<T, O>;
export declare function isGetOptions(val: any): val is GetOptions;
interface ParameterCallBack<O = any> {
    (options: O, target: any, instance: any, property: TypeProperty | undefined, parameterIndex: number): void;
}
export declare function createParameterDecorator<O = any>(metadataKey: string, defOptions?: ParameterOptions<any, O>, callback?: ParameterCallBack<O>): (opt?: O) => ParameterDecorator;
interface PropertyCallBack<O = any> {
    (options: O, target: any, instance: any, property: TypeProperty): void;
}
export declare function createPropertyDecorator<O = any>(metadataKey: string, defOptions?: PropertyOptions<any, O>, callback?: PropertyCallBack): (opt?: O) => PropertyDecorator;
interface MethodCallBack<O = any> {
    (options: O, target: any, instance: any): void;
}
export declare function createMethodDecorator<O = any>(metadataKey: string, defOptions?: MethodOptions<any, O>, callback?: MethodCallBack<O>): (opt?: O) => MethodDecorator;
interface ClassCallBack<O = any> {
    (options: O, target: any): void;
}
export declare function createClassDecorator<O>(metadataKey: string, defOptions?: ClassOptions<any, O>, callback?: ClassCallBack<O>): (opts?: O) => ClassDecorator;
declare type CallBack<O> = ClassCallBack<O> | PropertyCallBack<O> | MethodCallBack<O> | ParameterCallBack<O>;
export declare function createDecorator<O>(metadataKey: string, defOptions?: O | GetOptions<any, O>, callback?: CallBack<O>): (opts?: O) => any;
export {};
