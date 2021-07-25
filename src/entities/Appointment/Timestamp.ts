import { Either, left, right } from "@shared/either"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { InvalidDateTimeError } from "../errors/invalidDateTime"

dayjs.extend(customParseFormat)

class Timestamp {
  private constructor(private readonly _timestamp: string | number) {}

  static create(
    time: string | number
  ): Either<InvalidDateTimeError, Timestamp> {
    const isValid = this.validate(time)

    if (!isValid) return left(new InvalidDateTimeError(time.toString()))

    return right(new Timestamp(time))
  }

  get value(): string | number {
    return this._timestamp
  }

  private static validate(time: string | number): boolean {
    let date
    const validFormats = [
      "DD/MM/YYYY",
      "DD-MM-YYYY",
      "D-MM-YYYY",
      "DD-M-YYYY",
      "DD-MM-YY",
      "DD-M-YY",
      "D-MM-YY",
      "D/MM/YYYY",
      "DD/M/YYYY",
      "DD/MM/YY",
      "DD/M/YY",
      "D/MM/YY"
    ]

    if (typeof time === "number") {
      date = dayjs.unix(time)
    } else {
      date = time
    }

    const isDateValid = dayjs(date, validFormats, true).isValid()

    if (!isDateValid) return false

    const isDateBeforeNow = dayjs(date, validFormats).isBefore(dayjs())

    if (isDateBeforeNow) return false

    return true
  }
}

export { Timestamp }
