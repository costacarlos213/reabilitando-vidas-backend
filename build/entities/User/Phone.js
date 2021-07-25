"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Phone = void 0;

var _either = require("@shared/either");

var _invalidEmailError = require("../errors/invalidEmailError");

/* eslint no-useless-constructor: "off" */
class Phone {
  constructor(_phoneNumber) {
    this._phoneNumber = _phoneNumber;
  }

  static create(phone) {
    if (!phone) {
      return null;
    }

    const isValid = this.validate(phone);
    if (!isValid) return (0, _either.left)(new _invalidEmailError.InvalidEmailError(phone));
    return (0, _either.right)(new Phone(phone));
  }

  get value() {
    return this._phoneNumber;
  }

  static validate(phone) {
    const cleanPhone = phone.replace(/[\s().-]+/g, "");
    const tester = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

    if (!tester.test(cleanPhone)) {
      return false;
    }

    return true;
  }

}

exports.Phone = Phone;