class CSVParserError extends Error {
    public readonly cause?: Error;
    public code?: string;

    constructor(message: string, cause?: Error) {
        super(message);
        this.name = 'CSVParserError';
        this.cause = cause;
        this.code = 'CSV_PARSER_ERROR';

        if (cause && cause.stack) {
            this.stack = cause.stack;
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }

    toString() {
        return `${this.name}: ${this.message}` + (this.cause ? `\nCaused by: ${this.cause}` : '');
    }
}

export default CSVParserError;
