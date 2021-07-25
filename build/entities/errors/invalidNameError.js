"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidNameError = void 0;

class InvalidNameError extends Error {
  constructor(name) {
    super(`Name: ${name} is invalid.`);
    this.name = "InvalidNameError";
  }

}

exports.InvalidNameError = InvalidNameError;