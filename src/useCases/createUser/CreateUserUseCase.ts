import { User } from "@entities/User/User"
import { ICreateUserDTO } from "./CreateUserDTO"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import bcrypt from "bcrypt"
import { IMailProvider } from "@providers/mail/IMailProvider"
import { ConfirmationLinkProvider } from "@providers/token/generateConfirmationToken"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider,
    private tokenRepository: ITokenRepository
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

        this.tokenRepository.set({
          key: `CMT_${confirmationToken}_${userId}`,
          value: JSON.stringify({ userId }),
          expiration: 60 * 60 * 12
        })

        console.log(confirmationLink)

        this.mailProvider.sendEmail({
          jobName: "accountConfirmation",
          email: {
            from: {
              name: "Reabilitando vidas",
              address: "reabilitandovidas@email.com"
            },
            to: {
              name: name,
              address: email
            },
            text: `Para confirmar a conta clique no link: ${confirmationLink}`,
            subject: "Confirmação de email"
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
