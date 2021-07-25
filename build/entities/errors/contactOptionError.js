"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidContactOptionError = void 0;

class InvalidContactOptionError extends Error {
  constructor() {
    super(`Email and Phone cant be null at the same time`);
    this.name = "InvalidContactOptionError";
  }

}

exports.InvalidContactOptionError = InvalidContactOptionError;