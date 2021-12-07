import { Appointment } from "@prisma/client"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { IIndexAppointmentsDTO } from "./IndexAppointmentsDTO"

class IndexAppointmentsUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    filters,
    staff,
    userId
  }: IIndexAppointmentsDTO): Promise<Appointment[]> {
    if (staff) {
      const appointments = await this.appointmentRepository.indexAppointments(
        filters
      )

      return appointments
    } else {
      const appointments = await this.appointmentRepository.indexAppointments({
        patientId: userId
      })

      return appointments
    }
  }
}

export { IndexAppointmentsUseCase }
