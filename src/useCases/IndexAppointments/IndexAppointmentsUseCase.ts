import { Appointment } from "@prisma/client"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { NonStaffUserError } from "@useCases/errors/NonStaffUserError"
import { IIndexAppointmentsDTO } from "./IndexAppointmentsDTO"

class IndexAppointmentsUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    filters,
    userId
  }: IIndexAppointmentsDTO): Promise<Appointment[]> {
    const staffUser = await this.userRepository.getUniqueUser({
      id: userId
    })

    if (staffUser.staff) {
      const appointments = await this.appointmentRepository.indexAppointments(
        filters
      )

      return appointments
    } else {
      throw new NonStaffUserError()
    }
  }
}

export { IndexAppointmentsUseCase }
