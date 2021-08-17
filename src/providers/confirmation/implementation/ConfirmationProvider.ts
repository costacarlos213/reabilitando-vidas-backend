import { IMailProvider } from "@providers/mail/IMailProvider"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"
import { IConfirmationDTO, IConfirmationProvider } from "../IConfirmation"

class ConfirmationProvider implements IConfirmationProvider {
  constructor(
    private tokenRepository: ITokenRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(confirmationData: IConfirmationDTO): Promise<void> {
    this.tokenRepository.set(confirmationData.token)

    console.log(confirmationData.confirmationLink)

    this.mailProvider.sendEmail({
      jobName: confirmationData.jobName,
      email: {
        from: {
          name: "Reabilitando vidas",
          address: "reabilitandovidas@email.com"
        },
        to: confirmationData.email.to,
        text: confirmationData.email.text,
        subject: confirmationData.email.subject
      },
      jobOptions: {
        delay: confirmationData.email.delay
      }
    })
  }
}

export { ConfirmationProvider }
