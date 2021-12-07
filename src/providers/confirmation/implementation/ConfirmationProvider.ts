import { IMailProvider } from "@providers/mail/IMailProvider"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"
import { IConfirmationDTO, IConfirmationProvider } from "../IConfirmation"

class ConfirmationProvider implements IConfirmationProvider {
  constructor(
    private tokenRepository: ITokenRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(confirmationData: IConfirmationDTO): Promise<string> {
    this.tokenRepository.set(confirmationData.token)

    console.log(confirmationData.confirmationLink)

    const jobId = await this.mailProvider.sendEmail({
      jobName: confirmationData.jobName,
      email: {
        from: {
          name: "Reabilitando vidas",
          address: "reabilitandovidas@email.com"
        },
        to: confirmationData.email.to,
        html: confirmationData.email.html,
        subject: confirmationData.email.subject
      },
      jobOptions: {
        delay: confirmationData.email.delay
      }
    })

    return jobId
  }
}

export { ConfirmationProvider }
