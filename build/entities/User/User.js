"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _either = require("@shared/either");

var _CPF = require("./CPF");

var _contactOptionError = require("../errors/contactOptionError");

var _Name = require("./Name");

var _Email = require("./Email");

var _Phone = require("./Phone");

var _uuid = require("uuid");

/* eslint no-useless-constructor: "off" */
class User {
  constructor(CPF, Staff = false, Name, Email, Phone) {
    this.CPF = CPF;
    this.Staff = Staff;
    this.Name = Name;
    this.Email = Email;
    this.Phone = Phone;
    this.id = (0, _uuid.v4)();
  }

  static create(userData) {
    if (!userData.email && !userData.phone) {
      return (0, _either.left)(new _contactOptionError.InvalidContactOptionError());
    }

    let email = null;
    let phone = null;

    const cpfOrError = _CPF.CPF.create(userData.CPF);

    const nameOrError = _Name.Name.create(userData.name);

    const emailOrError = _Email.Email.create(userData.email);

    const phoneOrError = _Phone.Phone.create(userData.phone);

    if (nameOrError.isLeft()) return (0, _either.left)(nameOrError.value);
    if (cpfOrError.isLeft()) return (0, _either.left)(cpfOrError.value);

    if (emailOrError !== null) {
      if (emailOrError.isLeft()) {
        return (0, _either.left)(emailOrError.value);
      }

      email = emailOrError.value;
    }

    if (phoneOrError !== null) {
      if (phoneOrError.isLeft()) {
        return (0, _either.left)(phoneOrError.value);
      }

      phone = phoneOrError.value;
    }

    const cpf = cpfOrError.value;
    const name = nameOrError.value;
    return (0, _either.right)(new User(cpf, userData.staff, name, email, phone));
  }

}

exports.User = User;