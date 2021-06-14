class RegistrationErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

module.exports = RegistrationErr;
