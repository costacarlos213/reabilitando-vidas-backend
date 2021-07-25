import { Either, left, right } from "@shared/either"
import { InvalidCPFError } from "../errors/cpfError"
import { CPF } from "./CPF"
import { IUser } from "./IUser"
import { InvalidContactOptionError } from "../errors/contactOptionError"
import { Name } from "./Name"
import { Email } from "./Email"
import { InvalidNameError } from "../errors/invalidNameError"
import { InvalidEmailError } from "../errors/invalidEmailError"
import { Phone } from "./Phone"
import { InvalidPhoneError } from "../errors/invalidPhoneError"

export class User {
  private constructor(
    public readonly CPF: CPF,
    public readonly Staff: boolean = false,
    public readonly Name: Name,
    public readonly Email: Email | undefined,
    public readonly Phone: Phone | undefined,
    public readonly Password: string
  ) {}

  static create(
    userData: IUser
  ): Either<
    | InvalidCPFError
    | InvalidContactOptionError
    | InvalidEmailError
    | InvalidPhoneError,
    User
  > {
    if (userData.email.length === 0 && userData.phone.length === 0) {
      return left(new InvalidContactOptionError())
    }

    if (!userData.email && !userData.phone) {
      return left(new InvalidContactOptionError())
    }

    const cpfOrError: Either<InvalidCPFError, CPF> = CPF.create(userData.CPF)
    const nameOrError: Either<InvalidNameError, Name> = Name.create(
      userData.name
    )
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(
      userData.email
    )
    const phoneOrError: Either<InvalidPhoneError, Phone> = Phone.create(
      userData.phone
    )

    if (nameOrError.isLeft()) return left(nameOrError.value)
    if (cpfOrError.isLeft()) return left(cpfOrError.value)
    if (emailOrError.isLeft()) return left(emailOrError.value)
    if (phoneOrError.isLeft()) return left(phoneOrError.value)

    const cpf: CPF = cpfOrError.value
    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const phone: Phone = phoneOrError.value
    const password: string = userData.password.trim()

    return right(new User(cpf, userData.staff, name, email, phone, password))
  }
}
