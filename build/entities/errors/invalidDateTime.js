"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidDateTimeError = void 0;

class InvalidDateTimeError extends Error {
  constructor(date) {
    super(`The date: "${date}" or its format is invalid.`);
    this.name = "InvalidDateTimeError";
  }

}

exports.InvalidDateTimeError = InvalidDateTimeError;