import { IDomainError } from "./domainError"

export class InvalidNameError extends Error implements IDomainError {
  constructor(name: string) {
    super(`Name: ${name} is invalid.`)
    this.name = "InvalidNameError"
  }
}
