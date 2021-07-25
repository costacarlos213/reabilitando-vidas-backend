"use strict";

var _User = require("./User");

describe("User Domain Entity", () => {
  test("Create Simple User", () => {
    const options = {
      id: "725acdb0-e5e4-41a6-a0c6-44e71697a1ae",
      CPF: "436.616.758-18",
      name: "James Jimmy",
      email: "calorscsot@gmail.com",
      phone: "945508106"
    };

    const userOrError = _User.User.create(options);

    if (userOrError.isLeft()) {
      console.log(userOrError.value);
      return userOrError.value;
    }

    const user = userOrError.value;
    expect(userOrError.isRight()).toBeTruthy();
    expect(user.Email.value).toEqual(options.email);
    expect(user.Phone.value).toEqual(options.phone);
    expect(user.Name.value).toEqual(options.name);
    expect(user.CPF.value).toEqual(options.CPF);
  });
  test("Create user only with phone number", () => {
    const userOrError = _User.User.create({
      id: "725acdb0-e5e4-41a6-a0c6-44e71697a1ae",
      CPF: "436.616.758-18",
      name: "James",
      email: null,
      phone: "945508106"
    });

    if (userOrError.isLeft()) return userOrError.value;
    const user = userOrError.value;
    expect(userOrError.isRight()).toBeTruthy();
    expect(user.Email).toBeNull();
  });
  test("Create user only with Email", () => {
    const userOrError = _User.User.create({
      id: "725acdb0-e5e4-41a6-a0c6-44e71697a1ae",
      CPF: "436.616.758-18",
      name: "James",
      email: "calorscsot@gmail.com",
      phone: null
    });

    if (userOrError.isLeft()) return userOrError.value;
    const user = userOrError.value;
    expect(userOrError.isRight()).toBeTruthy();
    expect(user.Phone).toBeNull();
  });
  test("Create user without contact options", () => {
    const user = _User.User.create({
      id: "725acdb0-e5e4-41a6-a0c6-44e71697a1ae",
      CPF: "436.616.758-18",
      name: "James Jimmy",
      email: null,
      phone: null
    });

    expect(user.isLeft()).toBeTruthy();
  });
});