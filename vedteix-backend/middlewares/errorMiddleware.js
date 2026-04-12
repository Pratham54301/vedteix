/* eslint-disable no-unused-vars */
function errorMiddleware(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message =
    err.expose && err.message
      ? err.message
      : status === 500
        ? 'Internal server error'
        : err.message || 'Request failed';

  if (status >= 500) {
    console.error('Unhandled error:', err);
  }

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && err.stack
      ? { stack: err.stack.split('\n').slice(0, 6).join('\n') }
      : {}),
  });
}

module.exports = { errorMiddleware };
