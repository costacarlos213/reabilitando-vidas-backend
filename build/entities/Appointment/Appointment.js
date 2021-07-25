"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Appointment = void 0;

var _either = require("@shared/either");

var _User = require("../User/User");

var _Timestamp = require("./Timestamp");

/* eslint no-useless-constructor: "off" */
class Appointment {
  constructor(User, Timestamp, Confirmed = false) {
    this.User = _User.User;
    this.Timestamp = _Timestamp.Timestamp;
    this.Confirmed = Confirmed;
  }

  static create(appointmentData) {
    const timestampOrError = _Timestamp.Timestamp.create(appointmentData.timestamp);

    if (timestampOrError.isLeft()) return (0, _either.left)(timestampOrError.value);
    const timestamp = timestampOrError.value;
    return (0, _either.right)(new Appointment(appointmentData.user, timestamp));
  }

}

exports.Appointment = Appointment;