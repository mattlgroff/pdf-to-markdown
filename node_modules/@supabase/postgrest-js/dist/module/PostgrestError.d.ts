import type { PostgrestError as IPostgrestError } from './types';
export default class PostgrestError extends Error implements IPostgrestError {
    details: string;
    hint: string;
    code: string;
    constructor(context: IPostgrestError);
}
//# sourceMappingURL=PostgrestError.d.ts.map