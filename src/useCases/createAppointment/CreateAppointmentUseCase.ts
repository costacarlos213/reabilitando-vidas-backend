import { Appointment } from "@entities/Appointment/Appointment"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { ICreateAppointmentDTO } from "./CreateAppointmentDTO"

class CreateAppointmentUseCase {
  constructor(
    private createAppointmentRepository: IAppointmentRepository,
    private createUserRepository: IUserRepository
  ) {}

  async execute(appointmentData: ICreateAppointmentDTO): Promise<Error | void> {
    const { cpf, dateTime } = appointmentData

    try {
      const user = await this.createUserRepository.getUserByCPF(cpf)

      const appointment = Appointment.create({
        user,
        dateTime
      })

      await this.createAppointmentRepository.save(appointment)

      return null
    } catch (err) {
      return err
    }
  }
}

export { CreateAppointmentUseCase }
