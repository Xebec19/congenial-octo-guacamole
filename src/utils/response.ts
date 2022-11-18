export const successResponse = (msg:string, data = []) => ({ status:true, message:msg, data });

export const errorResponse = (msg:string, data=[]) => ({ status:false, message:msg,data });