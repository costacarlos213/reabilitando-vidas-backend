import { JobsOptions } from "bullmq"

interface IAddress {
  name: string
  address: string
}

export interface IEmail {
  to: IAddress
  from: IAddress
  subject: string
  html: string
}

export interface ISendEmailData {
  jobName: string
  email: IEmail
  jobOptions?: JobsOptions
}

export interface IMailProvider {
  sendEmail(sendEmailOptions: ISendEmailData): Promise<string>
  abortJob(jobId: string): Promise<void>
}
