"use strict";

var _User = require("../User/User");

var _Appointment = require("./Appointment");

describe("Appointment create test", () => {
  const userOrError = _User.User.create({
    id: "1",
    CPF: "18505342844",
    name: "Carlos Jimmy",
    email: "carlos@jimmt.com",
    phone: "11945508106"
  });

  if (userOrError.isLeft()) return false;
  const user = userOrError.value;
  test("New Simple Appointment", () => {
    const appointmentOrError = _Appointment.Appointment.create({
      user: user,
      timestamp: "26/08/2021"
    });

    expect(appointmentOrError.isRight()).toBeTruthy();
  });
  test("Appointment dated before today", () => {
    const appointmentOrError = _Appointment.Appointment.create({
      user: user,
      timestamp: "26-04-2021"
    });

    expect(appointmentOrError.isLeft()).toBeTruthy();
  });
});