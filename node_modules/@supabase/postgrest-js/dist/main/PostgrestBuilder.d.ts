import type { Fetch, PostgrestSingleResponse } from './types';
export default abstract class PostgrestBuilder<Result> implements PromiseLike<PostgrestSingleResponse<Result>> {
    protected method: 'GET' | 'HEAD' | 'POST' | 'PATCH' | 'DELETE';
    protected url: URL;
    protected headers: Record<string, string>;
    protected schema?: string;
    protected body?: unknown;
    protected shouldThrowOnError: boolean;
    protected signal?: AbortSignal;
    protected fetch: Fetch;
    protected isMaybeSingle: boolean;
    constructor(builder: PostgrestBuilder<Result>);
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */
    throwOnError(): this;
    then<TResult1 = PostgrestSingleResponse<Result>, TResult2 = never>(onfulfilled?: ((value: PostgrestSingleResponse<Result>) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseLike<TResult1 | TResult2>;
}
//# sourceMappingURL=PostgrestBuilder.d.ts.map