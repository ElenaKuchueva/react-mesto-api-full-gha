const { STATUS_FORBIDDEN } = require('./err');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
  }
}

module.exports = Forbidden;
