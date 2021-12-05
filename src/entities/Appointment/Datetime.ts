import { Either, left, right } from "@shared/either"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { InvalidDateTimeError } from "../errors/invalidDateTime"

dayjs.extend(utc)

class DateTime {
  private constructor(private readonly _dateTime: string) {}

  static create(
    dateTime: string | Date
  ): Either<InvalidDateTimeError, DateTime> {
    const formatedDateTime = dayjs.utc(dateTime).toISOString()

    const isValid = this.validate(formatedDateTime)

    if (!isValid)
      return left(new InvalidDateTimeError(formatedDateTime.toString()))

    return right(new DateTime(formatedDateTime))
  }

  get value(): string {
    return this._dateTime
  }

  private static validate(dateTime: string): boolean {
    const dayJSdateTime = dayjs(dateTime)

    const isValid = dayJSdateTime.isValid()

    if (!isValid) {
      return false
    }

    const isDateBeforeNow = dayJSdateTime.isBefore(dayjs())

    if (isDateBeforeNow) return false

    return true
  }
}

export { DateTime }
