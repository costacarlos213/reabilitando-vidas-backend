import { Queue, QueueOptions } from "bullmq"
import { IEmail, IMailProvider, ISendEmailData } from "../IMailProvider"
import queueOptions from "@config/queue"

class MailProvider implements IMailProvider {
  private queue: Queue

  constructor(options: QueueOptions) {
    this.queue = new Queue<IEmail>(queueOptions.queueName, {
      defaultJobOptions: {
        attempts: 5,
        backoff: { type: "exponential", delay: 2000 }
      },
      ...options
    })
  }

  async sendEmail(sendMailOptions: ISendEmailData): Promise<string> {
    const job = await this.queue.add(
      sendMailOptions.jobName,
      sendMailOptions.email,
      sendMailOptions.jobOptions
    )

    return job.id
  }

  async abortJob(jobId: string): Promise<void> {
    this.queue.remove(jobId)
  }

  close(): Promise<void> {
    return this.queue.close()
  }
}

export { MailProvider }
