const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  console.error({
    message: error.message,
    method: req.method,
    path: req.originalUrl,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    errors: error.errors || [],
  });
};

module.exports = errorMiddleware;