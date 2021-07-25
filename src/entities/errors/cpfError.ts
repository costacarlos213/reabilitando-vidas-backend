import { IDomainError } from "./domainError"

export class InvalidCPFError extends Error implements IDomainError {
  constructor(cpf: string) {
    super(`The cpf: "${cpf}" is invalid.`)
    this.name = "InvalidCPFError"
  }
}
