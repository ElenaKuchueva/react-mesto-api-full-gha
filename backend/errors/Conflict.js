const { STATUS_CONFLICT } = require('./err');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = Conflict;
