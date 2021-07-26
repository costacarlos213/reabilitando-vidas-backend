import { User } from "@entities/User/User"
import { IUser } from "@entities/User/IUser"
import { prisma } from "../../database/client"
import { CreateUserRepositoryResponse } from "./createUserRepositoryResponse"
import { left, right } from "@shared/either"
import { UserAlreadyExistsError } from "@useCases/errors/UserAlreadyExistsError"

class UserRepository {
  async findUser(
    email: string | undefined,
    phone: string | undefined
  ): Promise<boolean> {
    return true
  }

  async save(user: IUser): Promise<CreateUserRepositoryResponse> {
    const { CPF, email, phone, name, password, staff } = user

    const userAlreadyExists = await this.userAlreadyExists(CPF, email, phone)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    await prisma.user.create({
      data: {
        name,
        cpf: CPF,
        password,
        email,
        phone,
        staff
      }
    })

    return right(null)
  }

  async userAlreadyExists(
    cpf: string,
    email: string,
    phone: string
  ): Promise<boolean> {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            cpf: cpf
          },
          {
            phone: {
              not: undefined,
              equals: phone
            }
          },
          {
            email: {
              not: undefined,
              equals: email
            }
          }
        ]
      }
    })

    if (userAlreadyExists) {
      return true
    }

    return false
  }
}

export { UserRepository }
