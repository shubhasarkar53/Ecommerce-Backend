// class ErrorHandler extends Error{
//     constructor (message,statusCode){
//         super(message);
//         this.statusCode = statusCode;


//         ErrorHandler.captureStackTrace(this,this.constructor);
//     }
// }

// module.exports = ErrorHandler;



class ErrorHandler extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorHandler;