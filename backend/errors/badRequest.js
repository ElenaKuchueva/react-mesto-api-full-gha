const { STATUS_BAD_REQUEST } = require('./err');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequest;
