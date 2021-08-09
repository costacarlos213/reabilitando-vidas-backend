import mail from "@config/mail"
import { IEmail } from "@providers/mail/IMailProvider"
import { Job } from "bullmq"
import nodemailer, { SentMessageInfo } from "nodemailer"

const transporter = nodemailer.createTransport(mail)

export default async (job: Job<IEmail>): Promise<SentMessageInfo> =>
  transporter.sendMail(job.data)
