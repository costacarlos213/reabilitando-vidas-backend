"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidCPFError = void 0;

class InvalidCPFError extends Error {
  constructor(cpf) {
    super(`The cpf: "${cpf}" is invalid.`);
    this.name = "InvalidCPFError";
  }

}

exports.InvalidCPFError = InvalidCPFError;