"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _Timestamp = require("./Timestamp");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Timestamp test", () => {
  test("Simple Date", () => {
    const timestampOrError = _Timestamp.Timestamp.create("12/02/2023");

    expect(timestampOrError.isRight()).toBeTruthy();
  });
  test("Other format date", () => {
    const timestampOrError = _Timestamp.Timestamp.create("12/30/2023");

    expect(timestampOrError.isLeft()).toBeTruthy();
  });
  test("Unix date", () => {
    const unixDate = (0, _dayjs.default)("12/05/2022").unix();

    const timestampOrError = _Timestamp.Timestamp.create(unixDate);

    expect(timestampOrError.isRight()).toBeTruthy();
  });
  test("Invalid Month", () => {
    const timestampOrError = _Timestamp.Timestamp.create("10/42/2023");

    expect(timestampOrError.isRight()).toBeFalsy();
  });
  test("Invalid Day", () => {
    const timestampOrError = _Timestamp.Timestamp.create("34/02/2023");

    expect(timestampOrError.isRight()).toBeFalsy();
  });
  test("Diferent date separator", () => {
    const timestampOrError = _Timestamp.Timestamp.create("23-02-2022");

    expect(timestampOrError.isRight()).toBeTruthy();
  });
});