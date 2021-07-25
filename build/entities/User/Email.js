"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var _either = require("@shared/either");

var _invalidEmailError = require("../errors/invalidEmailError");

/* eslint no-useless-constructor: "off" */
class Email {
  constructor(_email) {
    this._email = _email;
  }

  static create(email) {
    if (!email) {
      return null;
    }

    const isValid = this.validate(email);
    if (!isValid) return (0, _either.left)(new _invalidEmailError.InvalidEmailError(email));
    return (0, _either.right)(new Email(email));
  }

  get value() {
    return this._email;
  }

  static validate(email) {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (email.length > 255) {
      return false;
    }

    if (!tester.test(email)) {
      return false;
    }

    const [account, address] = email.split("@");

    if (account.length > 63) {
      return false;
    }

    const domainParts = address.split(".");
    const domainIsValid = domainParts.every(part => {
      if (part.length > 63) {
        return false;
      } else {
        return true;
      }
    });

    if (!domainIsValid) {
      return false;
    }

    return true;
  }

}

exports.Email = Email;