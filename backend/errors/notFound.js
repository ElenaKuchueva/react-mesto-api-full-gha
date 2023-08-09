const { STATUS_NOT_FOUND } = require('./err');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
  }
}

module.exports = NotFound;
