"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgrestError extends Error {
    constructor(context) {
        super(context.message);
        this.name = 'PostgrestError';
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
    }
}
exports.default = PostgrestError;
//# sourceMappingURL=PostgrestError.js.map