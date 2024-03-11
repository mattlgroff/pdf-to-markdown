export declare type Fetch = typeof fetch;
/**
 * Error format
 *
 * {@link https://postgrest.org/en/stable/api.html?highlight=options#errors-and-http-status-codes}
 */
export declare type PostgrestError = {
    message: string;
    details: string;
    hint: string;
    code: string;
};
/**
 * Response format
 *
 * {@link https://github.com/supabase/supabase-js/issues/32}
 */
interface PostgrestResponseBase {
    status: number;
    statusText: string;
}
export interface PostgrestResponseSuccess<T> extends PostgrestResponseBase {
    error: null;
    data: T;
    count: number | null;
}
export interface PostgrestResponseFailure extends PostgrestResponseBase {
    error: PostgrestError;
    data: null;
    count: null;
}
export declare type PostgrestSingleResponse<T> = PostgrestResponseSuccess<T> | PostgrestResponseFailure;
export declare type PostgrestMaybeSingleResponse<T> = PostgrestSingleResponse<T | null>;
export declare type PostgrestResponse<T> = PostgrestSingleResponse<T[]>;
export declare type GenericTable = {
    Row: Record<string, unknown>;
    Insert: Record<string, unknown>;
    Update: Record<string, unknown>;
};
export declare type GenericUpdatableView = {
    Row: Record<string, unknown>;
    Insert: Record<string, unknown>;
    Update: Record<string, unknown>;
};
export declare type GenericNonUpdatableView = {
    Row: Record<string, unknown>;
};
export declare type GenericView = GenericUpdatableView | GenericNonUpdatableView;
export declare type GenericFunction = {
    Args: Record<string, unknown>;
    Returns: unknown;
};
export declare type GenericSchema = {
    Tables: Record<string, GenericTable>;
    Views: Record<string, GenericView>;
    Functions: Record<string, GenericFunction>;
};
export declare type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
export {};
//# sourceMappingURL=types.d.ts.map