import { Either } from "@shared/either"
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
  private readonly _id: string

  private constructor(
    public readonly cpf: CPF,
    public readonly Staff: boolean = false,
    public readonly Name: Name,
    public readonly Email: Email | undefined,
    public readonly Phone: Phone | undefined,
    public readonly Password: string = undefined,
    id?: string
  ) {
    if (id) {
      this._id = id
    }
  }

  get id(): string {
    return this._id
  }

  static create(userData: IUser): User {
    if (!userData.email && !userData.phone) {
      throw new InvalidContactOptionError()
    }

    const cpfOrError: Either<InvalidCPFError, CPF> = CPF.create(userData.cpf)
    const nameOrError: Either<InvalidNameError, Name> = Name.create(
      userData.name
    )
    const emailOrError: Either<InvalidEmailError, Email> = Email.create(
      userData.email
    )
    const phoneOrError: Either<InvalidPhoneError, Phone> = Phone.create(
      userData.phone
    )

    if (nameOrError.isLeft()) throw nameOrError.value
    if (cpfOrError.isLeft()) throw cpfOrError.value
    if (emailOrError.isLeft()) throw emailOrError.value
    if (phoneOrError.isLeft()) throw phoneOrError.value

    const cpf: CPF = cpfOrError.value
    const name: Name = nameOrError.value
    const email: Email = emailOrError.value
    const phone: Phone = phoneOrError.value

    return new User(
      cpf,
      userData.staff,
      name,
      email,
      phone,
      userData.password,
      userData.id
    )
  }
}
