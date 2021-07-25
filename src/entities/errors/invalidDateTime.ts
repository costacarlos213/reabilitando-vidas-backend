import { IDomainError } from "./domainError"

export class InvalidDateTimeError extends Error implements IDomainError {
  constructor(date: string) {
    super(`The date: "${date}" or its format is invalid.`)
    this.name = "InvalidDateTimeError"
  }
}
