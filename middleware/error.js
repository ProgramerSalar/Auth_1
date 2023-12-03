export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server error";
  err.statusCode == err.statusCode || 500;

  res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
};

export const asyncError = (passedFunc) => (req, res, next) => {
  Promise.resolve(passedFunc(req, res, next)).catch(next);
};
