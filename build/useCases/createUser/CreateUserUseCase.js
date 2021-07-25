"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _either = require("@shared/either");

var _User = require("src/entities/User/User");

/* eslint no-useless-constructor: "off" */
class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    const userOrError = _User.User.create(data);

    if (userOrError.isLeft()) return (0, _either.left)(userOrError.value);
    const user = userOrError.value;
    const userExists = this.userRepository.findUser(user.Email.value, user.Phone.value);

    if (userExists) {
      throw new Error("User Already Exists");
    }

    await this.userRepository.save({
      CPF: user.CPF.value,
      email: user.Email.value,
      name: user.Name.value,
      phone: user.Phone.value,
      staff: user.Staff
    });
  }

}

exports.CreateUserUseCase = CreateUserUseCase;