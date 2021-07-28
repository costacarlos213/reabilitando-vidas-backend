import { User } from "@entities/User/User"
import { ICreateUserDTO } from "./ICreateUserDTO"
import { IUserRepository } from "@repositories/userRepository/UserRepository"
import bcrypt from "bcrypt"

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: ICreateUserDTO): Promise<Error | void> {
    let password: string = userData.password

    if (!password) {
      password = userData.cpf
    }

    if (password.trim().length === 0) {
      const cleanString = userData.cpf.replace(/[\s.-]/g, "")
      password = cleanString
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const { email, phone, cpf, name, staff } = userData

    try {
      const user = User.create({
        cpf,
        email,
        name,
        phone,
        staff,
        password: hashPassword
      })

      await this.userRepository.save(user)
    } catch (err) {
      return err
    }

    return null
  }
}

export { CreateUserUseCase }
