import { Either } from "@shared/either"
import { UserAlreadyExistsError } from "@useCases/errors/UserAlreadyExistsError"
import { InvalidContactOptionError } from "src/entities/errors/contactOptionError"
import { InvalidCPFError } from "src/entities/errors/cpfError"
import { InvalidEmailError } from "src/entities/errors/invalidEmailError"
import { InvalidPhoneError } from "src/entities/errors/invalidPhoneError"

export type CreateUserResponse = Either<
  | InvalidCPFError
  | InvalidContactOptionError
  | InvalidEmailError
  | InvalidPhoneError
  | UserAlreadyExistsError,
  void
>
