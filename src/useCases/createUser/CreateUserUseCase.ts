import { User } from "@entities/User/User"
import { ICreateUserDTO } from "./CreateUserDTO"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import bcrypt from "bcrypt"
import { ConfirmationLinkProvider } from "@providers/token/generateConfirmationToken"
import { IConfirmationProvider } from "@providers/confirmation/IConfirmation"

class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private confirmationProvider: IConfirmationProvider
  ) {}

  async execute(userData: ICreateUserDTO): Promise<Error | void> {
    let password: string = userData.password
    let firstLogin = true

    if (!password) {
      password = userData.cpf
    } else {
      firstLogin = false
    }

    if (password.trim().length === 0) {
      const cleanString = userData.cpf.replace(/[\s.-]/g, "")
      password = cleanString
    }

    const hashPassword = await bcrypt.hash(password, 8)

    const { email, phone, cpf, name } = userData

    try {
      const user = User.create({
        cpf,
        email,
        name,
        phone,
        password: hashPassword
      })

      const nullOrId = await this.userRepository.save(user, firstLogin)
      let userId: string

      if (nullOrId) {
        userId = nullOrId
      } else {
        userId = user.id
      }

      if (email) {
        const confirmationToken = ConfirmationLinkProvider()

        const confirmationLink = `${process.env.SERVER_URL}/confirmation/${confirmationToken}`

        this.confirmationProvider.execute({
          userId,
          confirmationLink,
          confirmationToken,
          jobName: "accountConfirmation",
          email: {
            subject: "Confirmação de email",
            text: `Para confirmar a conta clique no link: ${confirmationLink}`,
            to: {
              name: name,
              address: email
            }
          },
          token: {
            key: `CMT_${confirmationToken}_${userId}`,
            value: JSON.stringify({ userId }),
            expiration: 60 * 60 * 12
          }
        })
      }
    } catch (err) {
      return err
    }

    return null
  }
}

export { CreateUserUseCase }
