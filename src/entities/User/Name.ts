import { Either, left, right } from "@shared/either"
import { InvalidNameError } from "../errors/invalidNameError"

class Name {
  private constructor(private readonly _name: string) {}

  static create(value: string): Either<InvalidNameError, Name> {
    const isValid = this.validate(value)

    if (!isValid) return left(new InvalidNameError(value))

    const cleanName = value.replace(/[^a-zA-Z ]/g, "")

    return right(new Name(cleanName))
  }

  get value(): string {
    return this._name
  }

  private static validate(name: string): boolean {
    if (typeof name !== "string") {
      return false
    }

    if (!name) {
      return false
    }

    const trimmedName = name.trim()

    if (trimmedName.length < 2 || trimmedName.length > 255) {
      return false
    }

    return true
  }
}

export { Name }
