import { IEmail } from "@providers/mail/IMailProvider"
import { QueueScheduler, Worker } from "bullmq"
import queueOptions from "@config/queue"
import path from "path"

export const worker = new Worker<IEmail>(
  queueOptions.queueName,
  path.join(__dirname, "\\../proccessor/mailProccessor.ts"),
  {
    connection: queueOptions.connection,
    concurrency: queueOptions.concurrency,
    limiter: queueOptions.limiter
  }
)

export const scheduler = new QueueScheduler(queueOptions.queueName, {
  connection: queueOptions.connection
})
