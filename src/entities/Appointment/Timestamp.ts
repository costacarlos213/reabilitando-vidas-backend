import { Either, left, right } from "@shared/either"
import dayjs from "dayjs"
import { InvalidDateTimeError } from "../errors/invalidDateTime"

class Timestamp {
  private constructor(private readonly _timestamp: number) {}

  static create(timestamp: number): Either<InvalidDateTimeError, Timestamp> {
    const isValid = this.validate(timestamp)

    if (!isValid) return left(new InvalidDateTimeError(timestamp.toString()))

    return right(new Timestamp(timestamp))
  }

  get value(): number {
    return this._timestamp
  }

  private static validate(timestamp: number): boolean {
    const dayJSTimeStamp = dayjs.unix(timestamp)

    const isDateBeforeNow = dayJSTimeStamp.isBefore(dayjs())

    if (isDateBeforeNow) return false

    return true
  }
}

export { Timestamp }
