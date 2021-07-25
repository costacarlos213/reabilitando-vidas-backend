"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidEmailError = void 0;

class InvalidEmailError extends Error {
  constructor(email) {
    super(`Email: ${email} is invalid.`);
    this.name = "InvalidEmailError";
  }

}

exports.InvalidEmailError = InvalidEmailError;