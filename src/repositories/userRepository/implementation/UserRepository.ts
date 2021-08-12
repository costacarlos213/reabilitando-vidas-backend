import { User } from "@entities/User/User"
import { prisma } from "@database/client"
import { UserAlreadyExistsError } from "@useCases/errors/UserAlreadyExistsError"
import { IUserRepository, logedUser } from "../IUserRepository"
import { UserDoNotExistsError } from "@useCases/errors/UserDoNotExistsError"
import { Status } from "@prisma/client"

class UserRepository implements IUserRepository {
  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id
      }
    })
  }

  async updateStatus(status: Status, userId: string): Promise<void> {
    await prisma.user.update({
      data: {
        status: status
      },
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
        status: true
      }
    })

    return user
  }

  async getUserByCPF(requestedCpf: string): Promise<User> {
    const databaseStoredUser = await prisma.user.findUnique({
      where: {
        cpf: requestedCpf
      },
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        phone: true
      }
    })

    if (!databaseStoredUser) throw new UserDoNotExistsError()

    const user = User.create({
      id: databaseStoredUser.id,
      cpf: databaseStoredUser.cpf,
      email: databaseStoredUser.email,
      name: databaseStoredUser.name,
      phone: databaseStoredUser.phone
    })

    return user
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
