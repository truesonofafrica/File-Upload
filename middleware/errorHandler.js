const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let message = err.message || 'Something went wrong. Please try again';
  const statusCode = err.statusCode || 500;

  // if(err = "ValidationError"){
  //   message = err.
  // }

  return res.status(statusCode).json({ status: 'fail', message });
};

module.exports = errorHandlerMiddleware;
