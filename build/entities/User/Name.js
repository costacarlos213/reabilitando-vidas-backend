"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Name = void 0;

var _either = require("@shared/either");

var _invalidNameError = require("../errors/invalidNameError");

/* eslint no-useless-constructor: "off" */
class Name {
  constructor(_name) {
    this._name = _name;
  }

  static create(value) {
    const isValid = this.validate(value);
    if (!isValid) return (0, _either.left)(new _invalidNameError.InvalidNameError(value));
    const cleanName = value.replace(/[^a-zA-Z ]/g, "");
    return (0, _either.right)(new Name(cleanName));
  }

  get value() {
    return this._name;
  }

  static validate(name) {
    if (typeof name !== "string") {
      return false;
    }

    if (!name) {
      return false;
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 255) {
      return false;
    }

    return true;
  }

}

exports.Name = Name;