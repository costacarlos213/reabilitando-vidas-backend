"use strict";

var _Phone = require("./Phone");

describe("Phone validator", () => {
  test("Phone with special chars", () => {
    const phoneOrError = _Phone.Phone.create("(11) 94550-8106");

    expect(phoneOrError.isRight()).toBeTruthy();
  });
  test("Phone without special chars", () => {
    const phoneOrError = _Phone.Phone.create("11945508106");

    expect(phoneOrError.isRight()).toBeTruthy();
  });
  test("Phone with invalid DDD", () => {
    const phoneOrError = _Phone.Phone.create("(00) 983530139");

    expect(phoneOrError.isLeft()).toBeTruthy();
  });
  test("Phone with too much numbers", () => {
    const phoneOrError = _Phone.Phone.create("98353013342349");

    expect(phoneOrError.isLeft()).toBeTruthy();
  });
  test("Phone with 8 numbers", () => {
    const phoneOrError = _Phone.Phone.create("(11) 8823-7519");

    expect(phoneOrError.isRight()).toBeTruthy();
  });
  test("Phone starting with 0", () => {
    const phoneOrError = _Phone.Phone.create("(11) 009384571");

    expect(phoneOrError.isLeft()).toBeTruthy();
  });
  test("Not enough numbers", () => {
    const phoneOrError = _Phone.Phone.create("9932845");

    expect(phoneOrError.isLeft()).toBeTruthy();
  });
});