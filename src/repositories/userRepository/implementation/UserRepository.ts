import { prisma } from "@database/client"
import { User as PrismaUser } from "@prisma/client"
import { User } from "@entities/User/User"
import { UserAlreadyExistsError } from "@useCases/errors/UserAlreadyExistsError"
import { UserDoNotExistsError } from "@useCases/errors/UserDoNotExistsError"
import { IUserRepository } from "../IUserRepository"
import { logedUser, UniqueUserKeys } from "../userRepo"

class UserRepository implements IUserRepository {
  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }

  async updateUser(
    field: Record<string, unknown>,
    userId: string
  ): Promise<void> {
    await prisma.user.update({
      data: field,
      where: {
        id: userId
      }
    })

    return null
  }

  async getUserByLoginOptions(login: string): Promise<logedUser> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: login
          },
          {
            phone: login
          }
        ]
      },
      select: {
        password: true,
        id: true,
        firstLogin: true,
        status: true,
        name: true,
        staff: true,
        email: true
      }
    })

    return user
  }

  async getUniqueUser(key: UniqueUserKeys): Promise<PrismaUser> {
    const databaseStoredUser = await prisma.user.findUnique({
      where: key
    })

    if (!databaseStoredUser) throw new UserDoNotExistsError()

    return databaseStoredUser
  }

  async save(user: User, firstLogin: boolean): Promise<void | string> {
    const { cpf, Email, Phone, Name, Password, Staff } = user

    try {
      const userAlreadyExists = await this.userAlreadyExists(
        cpf.value,
        Email.value,
        Phone.value
      )

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError()
      }

      await prisma.user.create({
        data: {
          id: user.id,
          cpf: cpf.value,
          name: Name.value,
          password: Password,
          email: Email.value,
          phone: Phone.value,
          staff: Staff,
          firstLogin
        }
      })

      return null
    } catch (error) {
      throw new Error(error)
    }
  }

  private async userAlreadyExists(
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
