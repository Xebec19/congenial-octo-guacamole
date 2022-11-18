export default class AppError extends Error {
    isOperational: boolean;

    constructor(message: string, isOperational = true, stack = '') {
        super(message);
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
