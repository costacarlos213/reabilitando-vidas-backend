import { IUseCaseError } from "./useCasesError"

export class UserAlreadyExistsError extends Error implements IUseCaseError {
  constructor() {
    super(`Tried to create a user who already exists.`)
    this.name = "User Already Exists"
  }
}
