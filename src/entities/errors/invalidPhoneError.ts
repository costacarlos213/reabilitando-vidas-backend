import { IDomainError } from "./domainError"

export class InvalidPhoneError extends Error implements IDomainError {
  constructor(phone: string) {
    super(`Phone: ${phone} is invalid.`)
    this.name = "InvalidPhoneError"
  }
}
