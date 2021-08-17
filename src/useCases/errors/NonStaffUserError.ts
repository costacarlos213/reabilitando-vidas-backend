import { IUseCaseError } from "./useCasesError"

export class NonStaffUserError extends Error implements IUseCaseError {
  constructor() {
    super(`Non staff users can't make this.`)
    this.name = "Non Staff User Error"
  }
}
