import { Appointment } from "@entities/Appointment/Appointment"
import { IAppointmentRepository } from "@repositories/appointmentRepository/AppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/UserRepository"
import { ICreateAppointmentDTO } from "./CreateAppointmentDTO"

class CreateAppointmentUseCase {
  constructor(
    private createAppointmentRepository: IAppointmentRepository,
    private createUserRepository: IUserRepository
  ) {}

  async execute(appointmentData: ICreateAppointmentDTO): Promise<Error | void> {
    const { cpf, timestamp } = appointmentData

    try {
      const user = await this.createUserRepository.getUserByCPF(cpf)

      const appointment = Appointment.create({
        user,
        timestamp
      })

      await this.createAppointmentRepository.save(appointment)

      return null
    } catch (err) {
      return err
    }
  }
}

export { CreateAppointmentUseCase }
