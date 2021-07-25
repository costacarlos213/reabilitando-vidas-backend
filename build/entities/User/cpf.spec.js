"use strict";

var _CPF = require("./CPF");

describe("CPF Validator", () => {
  test("Create CPF with special chars", () => {
    const cpfOrError = _CPF.CPF.create("436.616.758-18");

    expect(cpfOrError.isRight()).toBeTruthy();
  });
  test("Clean CPF", () => {
    const cpf = _CPF.CPF.create("29807826888");

    expect(cpf.isRight()).toBeTruthy();
  });
  test("CPF With random special chars", () => {
    const cpf = _CPF.CPF.create("4-36.61*6.75(8-18");

    expect(cpf.isRight()).toBeFalsy();
  });
  test("Too Much digits CPF", () => {
    const cpf = _CPF.CPF.create("298078268884");

    expect(cpf.isRight()).toBeFalsy();
  });
  test("Wrong First checker", () => {
    const cpf = _CPF.CPF.create("29807826818");

    expect(cpf.isRight()).toBeFalsy();
  });
  test("Wrong Second Checker", () => {
    const cpf = _CPF.CPF.create("29807826884");

    expect(cpf.isRight()).toBeFalsy();
  });
  test("Repeated digits", () => {
    const cpf = _CPF.CPF.create("00000000000");

    expect(cpf.isRight()).toBeFalsy();
  });
  test("Repeated with formatation", () => {
    const cpf = _CPF.CPF.create("111.111.111-11");

    expect(cpf.isRight()).toBeFalsy();
  });
});