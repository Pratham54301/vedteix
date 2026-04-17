/**
 * Wraps an async route handler so that any unhandled promise rejection is
 * forwarded to Express's next(error) error-handling middleware instead of
 * causing an unhandled rejection (which results in a 502 with no response body).
 *
 * Usage:
 *   router.get('/', asyncHandler(myAsyncController));
 *
 * @param {Function} fn - An async Express route handler (req, res, next) => Promise
 * @returns {Function} A standard Express route handler that catches async errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
