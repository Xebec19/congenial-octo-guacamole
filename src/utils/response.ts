export const successResponse = <T>(
    msg: string,
    data: T,
): { status: boolean; message: string; data: T } => ({
    status: true,
    message: msg,
    data,
});

export const errorResponse = <T>(
    msg: string,
    data: T,
): { status: boolean; message: string; data: T | undefined } => ({
    status: false,
    message: msg,
    data,
});
