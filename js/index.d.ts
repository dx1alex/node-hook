export declare class Hook {
    options: HookOptions;
    logger: any;
    static needle: Needle.NeedleStatic;
    constructor(options?: HookOptions, logger?: any);
    defaults(options?: HookOptions): HookOptions;
    request(method: string, url: string, data?: any, options?: HookOptions): Promise<any>;
    stream(method: string, url: string, data?: any, options?: HookOptions, callback?: Needle.Callback): Needle.ReadableStream;
    head(url: string, options?: HookOptions): Promise<any>;
    get(url: string, data?: any, options?: HookOptions): Promise<any>;
    post(url: string, data: any, options?: HookOptions): Promise<any>;
    put(url: string, data: any, options?: HookOptions): Promise<any>;
    patch(url: string, data: any, options?: HookOptions): Promise<any>;
    delete(url: string, data: any, options?: HookOptions): Promise<any>;
    private _updateOptions(options, url);
}
export default Hook;
export interface RequestOptions {
    timeout?: number;
    read_timeout?: number;
    open_timeout?: number;
    follow?: number;
    follow_max?: number;
    follow_set_cookies?: boolean;
    follow_set_referer?: boolean;
    follow_keep_method?: boolean;
    follow_if_same_host?: boolean;
    follow_if_same_protocol?: boolean;
    multipart?: boolean;
    proxy?: string;
    agent?: string;
    proxy_agent?: string;
    headers?: HttpHeaderOptions;
    auth?: string;
    json?: boolean;
    compressed?: boolean;
    cookies?: {
        [name: string]: any;
    };
    username?: string;
    password?: string;
}
export interface ResponseOptions {
    decode?: boolean;
    decode_response?: boolean;
    parse?: boolean;
    parse_response?: boolean;
    parse_cookies?: boolean;
    output?: any;
}
export interface HttpHeaderOptions {
    cookies?: {
        [name: string]: any;
    };
    compressed?: boolean;
    accept?: string;
    connection?: string;
    user_agent?: string;
    username?: string;
    password?: string;
}
export interface TLSOptions {
    pfx?: any;
    key?: any;
    passphrase?: string;
    cert?: any;
    ca?: any;
    ciphers?: any;
    rejectUnauthorized?: boolean;
    secureProtocol?: any;
}
export interface HookOptions extends RequestOptions, ResponseOptions, HttpHeaderOptions, TLSOptions {
    http_code_throw?: boolean;
    response?: boolean;
}
