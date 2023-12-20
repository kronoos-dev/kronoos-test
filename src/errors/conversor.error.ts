class ConversorError extends Error {
    public readonly cause?: Error;
    public code?: string;


    constructor(message: string, cause?: Error) {
        super(message);
        this.name = 'ConversorError';
        this.cause = cause;
        this.code = 'CONVERSOR_ERROR';

        if (cause && cause.stack) {
            this.stack = cause.stack;
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }

    toString() {
        return `${this.name}: ${this.message}` + (this.cause ? `\nCaused by: ${this.cause}` : '');
    }
}

export default ConversorError;
