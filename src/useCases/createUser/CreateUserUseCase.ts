import { left, right } from "@shared/either"
import { User } from "@entities/User/User"
import { ICreateUserDTO } from "./ICreateUserDTO"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { CreateUserResponse } from "./createUserResponse"
import { CreateUserRepositoryResponse } from "@repositories/userRepository/createUserRepositoryResponse"
import bcrypt from "bcrypt"

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: ICreateUserDTO): Promise<CreateUserResponse> {
    let password: string = userData.password

    if (!password) {
      password = userData.CPF
    }

    if (password.trim().length === 0) {
      const cleanString = userData.CPF.replace(/[\s.-]/g, "")
      password = cleanString
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const { email, phone, CPF, name, staff } = userData

    const userOrError = User.create({
      CPF,
      email,
      name,
      phone,
      staff,
      password: hashPassword
    })

    if (userOrError.isLeft()) return left(userOrError.value)

    const user: User = userOrError.value

    const savedOrError: CreateUserRepositoryResponse =
      await this.userRepository.save({
        CPF: user.CPF.value,
        email: user.Email.value,
        name: user.Name.value,
        phone: user.Phone.value,
        staff: user.Staff,
        password: user.Password
      })

    if (savedOrError.isLeft()) return left(savedOrError.value)

    return right(null)
  }
}

export { CreateUserUseCase }
