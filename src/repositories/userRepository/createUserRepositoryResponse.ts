import { Either } from "@shared/either"
import { UserAlreadyExistsError } from "@useCases/errors/UserAlreadyExistsError"

export type CreateUserRepositoryResponse = Either<UserAlreadyExistsError, void>
