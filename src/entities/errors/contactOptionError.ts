import { IDomainError } from "./domainError"

export class InvalidContactOptionError extends Error implements IDomainError {
  constructor() {
    super(`Email and Phone cant be null at the same time`)
    this.name = "InvalidContactOptionError"
  }
}
