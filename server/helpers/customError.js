module.exports = class CustomError extends Error {
  constructor(message, extra) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'CustomError';
    this.message = message;
    if (extra) this.extra = extra;
  }
};
