import { IUseCaseError } from "./useCasesError"

export class UserDoNotExistsError extends Error implements IUseCaseError {
  constructor() {
    super(`The application can't find any user with this creds.`)
    this.name = "Can't find user."
  }
}
