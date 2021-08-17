import { Appointment } from "@prisma/client"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { NonStaffUserError } from "@useCases/errors/NonStaffUserError"

class IndexAppointmentsUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Appointment[] | Error> {
    const staffUser = await this.userRepository.getUniqueUser({
      id: userId
    })

    if (staffUser.staff) {
      try {
        const appointments =
          await this.appointmentRepository.indexAppointments()

        if (!appointments) {
          return new Error("There aren't any appointments.")
        }

        return appointments
      } catch (err) {
        return err
      }
    } else {
      return new NonStaffUserError()
    }
  }
}

export { IndexAppointmentsUseCase }
