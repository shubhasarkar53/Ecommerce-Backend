// const ErrorHandler = require("../utills/errorHandler");

// module.exports = (err,req,res,next)=>{
//     err.statusCode = err.statusCode
//     err.message = err.message

//     res.status(statusCode).json({
//         success:false,
//         message:err.message
//     });
// };

const ErrorHandler = require("../utills/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // MOngoDB cast error
  if(err.name === "CastError"){
    const message = `Resource not found. Invalid Path :${err.path}`;
    err = new ErrorHandler(400,message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    // tmsg: "Internal Server error",
  });
};
