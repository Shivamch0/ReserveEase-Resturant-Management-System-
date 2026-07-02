export class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errros = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errros;
        this.message = message;

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}