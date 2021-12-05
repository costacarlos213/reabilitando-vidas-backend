import { IMailProvider } from "@providers/mail/IMailProvider"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IDeleteAppointmentDTO } from "./DeleteAppointmentDTO"

class DeleteAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute({
    appointmentId,
    jobId
  }: IDeleteAppointmentDTO): Promise<void> {
    await this.appointmentRepository.deleteAppointment(appointmentId)

    await this.mailProvider.abortJob(jobId)
  }
}

export { DeleteAppointmentUseCase }
