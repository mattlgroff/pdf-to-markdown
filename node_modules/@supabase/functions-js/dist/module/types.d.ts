export declare type Fetch = typeof fetch;
/**
 * Response format
 *
 */
export interface FunctionsResponseSuccess<T> {
    data: T;
    error: null;
}
export interface FunctionsResponseFailure {
    data: null;
    error: any;
}
export declare type FunctionsResponse<T> = FunctionsResponseSuccess<T> | FunctionsResponseFailure;
export declare class FunctionsError extends Error {
    context: any;
    constructor(message: string, name?: string, context?: any);
}
export declare class FunctionsFetchError extends FunctionsError {
    constructor(context: any);
}
export declare class FunctionsRelayError extends FunctionsError {
    constructor(context: any);
}
export declare class FunctionsHttpError extends FunctionsError {
    constructor(context: any);
}
export declare type FunctionInvokeOptions = {
    /**
     * Object representing the headers to send with the request.
     * */
    headers?: {
        [key: string]: string;
    };
    /**
     * The HTTP verb of the request
     */
    method?: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
    /**
     * The body of the request.
     */
    body?: File | Blob | ArrayBuffer | FormData | ReadableStream<Uint8Array> | Record<string, any> | string;
};
//# sourceMappingURL=types.d.ts.map