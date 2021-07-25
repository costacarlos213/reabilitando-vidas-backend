import { Either, left, right } from "@shared/either"
import { InvalidEmailError } from "../errors/invalidEmailError"

export class Email {
  private constructor(private readonly _email: string | undefined) {}

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!email) {
      return right(new Email(undefined))
    }

    if (email.length === 0) {
      return right(new Email(undefined))
    }

    const isValid = this.validate(email)

    if (!isValid) return left(new InvalidEmailError(email))

    return right(new Email(email))
  }

  get value(): string | undefined {
    return this._email
  }

  static validate(email: string): boolean {
    const tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

    if (email.length > 255) {
      return false
    }

    if (!tester.test(email)) {
      return false
    }

    const [account, address] = email.split("@")

    if (account.length > 63) {
      return false
    }

    const domainParts = address.split(".")

    const domainIsValid = domainParts.every(part => {
      if (part.length > 63) {
        return false
      } else {
        return true
      }
    })

    if (!domainIsValid) {
      return false
    }

    return true
  }
}
