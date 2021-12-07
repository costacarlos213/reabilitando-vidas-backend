import { ISetValue } from "@repositories/tokenRepository/ITokenRepository"

interface IEmail {
  to: {
    name: string
    address: string
  }
  html: string
  subject: string
  delay?: number
}

export interface IConfirmationDTO {
  jobName: string
  email: IEmail
  confirmationLink: string
  confirmationToken: string
  token: ISetValue
  userId: string
}

export interface IConfirmationProvider {
  execute(confirmationData: IConfirmationDTO): Promise<string>
}
