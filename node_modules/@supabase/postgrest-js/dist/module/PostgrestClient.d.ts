import PostgrestQueryBuilder from './PostgrestQueryBuilder';
import PostgrestFilterBuilder from './PostgrestFilterBuilder';
import { Fetch, GenericSchema } from './types';
/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */
export default class PostgrestClient<Database = any, SchemaName extends string & keyof Database = 'public' extends keyof Database ? 'public' : string & keyof Database, Schema extends GenericSchema = Database[SchemaName] extends GenericSchema ? Database[SchemaName] : any> {
    url: string;
    headers: Record<string, string>;
    schemaName?: SchemaName;
    fetch?: Fetch;
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */
    constructor(url: string, { headers, schema, fetch, }?: {
        headers?: Record<string, string>;
        schema?: SchemaName;
        fetch?: Fetch;
    });
    from<TableName extends string & keyof Schema['Tables'], Table extends Schema['Tables'][TableName]>(relation: TableName): PostgrestQueryBuilder<Schema, Table, TableName>;
    from<ViewName extends string & keyof Schema['Views'], View extends Schema['Views'][ViewName]>(relation: ViewName): PostgrestQueryBuilder<Schema, View, ViewName>;
    from(relation: string): PostgrestQueryBuilder<Schema, any, any>;
    /**
     * Select a schema to query or perform an function (rpc) call.
     *
     * The schema needs to be on the list of exposed schemas inside Supabase.
     *
     * @param schema - The schema to query
     */
    schema<DynamicSchema extends string & keyof Database>(schema: DynamicSchema): PostgrestClient<Database, DynamicSchema, Database[DynamicSchema] extends GenericSchema ? Database[DynamicSchema] : any>;
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */
    rpc<FunctionName extends string & keyof Schema['Functions'], Function_ extends Schema['Functions'][FunctionName]>(fn: FunctionName, args?: Function_['Args'], { head, count, }?: {
        head?: boolean;
        count?: 'exact' | 'planned' | 'estimated';
    }): PostgrestFilterBuilder<Schema, Function_['Returns'] extends any[] ? Function_['Returns'][number] extends Record<string, unknown> ? Function_['Returns'][number] : never : never, Function_['Returns']>;
}
//# sourceMappingURL=PostgrestClient.d.ts.map