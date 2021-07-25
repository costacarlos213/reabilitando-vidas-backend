import { IDomainError } from "./domainError"

export class InvalidEmailError extends Error implements IDomainError {
  constructor(email: string) {
    super(`Email: ${email} is invalid.`)
    this.name = "InvalidEmailError"
  }
}
