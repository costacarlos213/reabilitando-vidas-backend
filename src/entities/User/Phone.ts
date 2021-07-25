import { Either, left, right } from "@shared/either"
import { InvalidEmailError } from "../errors/invalidEmailError"
import { InvalidPhoneError } from "../errors/invalidPhoneError"

class Phone {
  constructor(private readonly _phoneNumber: string | undefined) {}

  static create(phone: string): Either<InvalidPhoneError, Phone> {
    if (!phone) {
      return right(new Phone(undefined))
    }

    if (phone.length === 0) {
      return right(new Phone(undefined))
    }

    const isValid = this.validate(phone)

    if (!isValid) return left(new InvalidEmailError(phone))

    return right(new Phone(phone))
  }

  get value(): string | undefined {
    return this._phoneNumber
  }

  private static validate(phone: string): boolean {
    const cleanPhone = phone.replace(/[\s().-]+/g, "")

    const tester =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/

    if (!tester.test(cleanPhone)) {
      return false
    }

    return true
  }
}

export { Phone }
