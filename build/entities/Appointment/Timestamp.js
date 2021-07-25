"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timestamp = void 0;

var _either = require("@shared/either");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));

var _invalidDateTime = require("../errors/invalidDateTime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-useless-constructor: "off" */
_dayjs.default.extend(_customParseFormat.default);

class Timestamp {
  constructor(_timestamp) {
    this._timestamp = _timestamp;
  }

  static create(time) {
    const isValid = this.validate(time);
    if (!isValid) return (0, _either.left)(new _invalidDateTime.InvalidDateTimeError(time.toString()));
    return (0, _either.right)(new Timestamp(time));
  }

  get value() {
    return this._timestamp;
  }

  static validate(time) {
    let date;
    const validFormats = ["DD/MM/YYYY", "DD-MM-YYYY", "D-MM-YYYY", "DD-M-YYYY", "DD-MM-YY", "DD-M-YY", "D-MM-YY", "D/MM/YYYY", "DD/M/YYYY", "DD/MM/YY", "DD/M/YY", "D/MM/YY"];

    if (typeof time === "number") {
      date = _dayjs.default.unix(time);
    } else {
      date = time;
    }

    const isDateValid = (0, _dayjs.default)(date, validFormats, true).isValid();
    if (!isDateValid) return false;
    const isDateBeforeNow = (0, _dayjs.default)(date, validFormats).isBefore((0, _dayjs.default)());
    if (isDateBeforeNow) return false;
    return true;
  }

}

exports.Timestamp = Timestamp;