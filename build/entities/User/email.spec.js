"use strict";

var _Email = require("./Email");

describe("email tester", () => {
  test("Simple Email", () => {
    const emailOrError = _Email.Email.create("carloscosta2912@gmail.com");

    expect(emailOrError.isRight()).toBeTruthy();
  });
  test("Null Email", () => {
    const emailOrError = _Email.Email.create();

    expect(emailOrError).toBeNull();
  });
  test("Too long address", () => {
    let sum = "";

    for (let i = 0; i < 64; i++) {
      sum += "a";
    }

    sum += "@gmail.com";

    const emailOrError = _Email.Email.create(sum);

    expect(emailOrError.isRight()).toBeFalsy();
  });
  test("Too long domain", () => {
    let sum = "carloscosta@";

    for (let i = 0; i < 64; i++) {
      sum += "a";
    }

    sum += ".com";

    const emailOrError = _Email.Email.create(sum);

    expect(emailOrError.isRight()).toBeFalsy();
  });
});