import { IMailProvider } from "@providers/mail/IMailProvider"
import { ConfirmationLinkProvider } from "@providers/token/generateConfirmationToken"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { UserDoNotExistsError } from "@useCases/errors/UserDoNotExistsError"
import { IPasswordResetDTO } from "./PasswordResetDTO"
import bcrypt from "bcrypt"
import { generatePasswordResetTokenEmail } from "../../utils/PasswordResetTokenTemplateProvider"
import { generateResetedPasswordEmail } from "../../utils/ResetedPasswordTemplate"

class PasswordResetUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository,
    private mailProvider: IMailProvider
  ) {}

  async executeRequest(email: string): Promise<void> {
    const user = await this.userRepository.getUserByLoginOptions(email)

    if (!user) {
      throw new UserDoNotExistsError()
    }
    const resetToken = ConfirmationLinkProvider()

    console.log(resetToken)

    await this.tokenRepository.set({
      key: `RST_${resetToken}_${user.id}`,
      value: JSON.stringify({ userId: user.id }),
      expiration: 60 * 60 * 12
    })

    this.mailProvider.sendEmail({
      jobName: "passwordReset",
      email: {
        from: {
          name: "Reabilitando vidas",
          address: "reabilitandovidas@email.com"
        },
        to: {
          name: user.name,
          address: user.email
        },
        html: generatePasswordResetTokenEmail(resetToken),
        subject: "Redefinição de senha"
      }
    })
  }

  async executeReset(passwordResetData: IPasswordResetDTO): Promise<void> {
    const { password, token } = passwordResetData

    const userId = await this.tokenRepository.getByPattern(`RST_${token}_`)

    const hashPassword = await bcrypt.hash(password, 8)

    if (userId) {
      await this.userRepository.updateUser(
        { password: hashPassword },
        JSON.parse(userId).userId
      )

      const user = await this.userRepository.getUniqueUser({
        id: JSON.parse(userId).userId
      })

      await this.tokenRepository.deleleteByPattern(`RST_${token}_`)

      this.mailProvider.sendEmail({
        jobName: "passwordReset",
        email: {
          from: {
            name: "Reabilitando vidas",
            address: "reabilitandovidas@email.com"
          },
          to: {
            name: user.name,
            address: user.email
          },
          html: generateResetedPasswordEmail(),
          subject: "Redefinição de senha"
        }
      })
    } else {
      throw new Error("Invalid password reset link")
    }
  }
}

export { PasswordResetUseCase }
