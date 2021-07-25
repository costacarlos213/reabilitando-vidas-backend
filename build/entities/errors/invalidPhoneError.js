"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidPhoneError = void 0;

class InvalidPhoneError extends Error {
  constructor(phone) {
    super(`Phone: ${phone} is invalid.`);
    this.name = "InvalidPhoneError";
  }

}

exports.InvalidPhoneError = InvalidPhoneError;