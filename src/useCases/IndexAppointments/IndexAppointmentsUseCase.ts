import { Appointment } from "@prisma/client"
import { IAppointmentRepository } from "@repositories/appointmentRepository/AppointmentRepository"

class IndexAppointmentsUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(): Promise<Appointment[] | Error> {
    try {
      const appointments = await this.appointmentRepository.indexAppointments()

      if (!appointments) {
        return new Error("There aren't any appointments.")
      }

      return appointments
    } catch (err) {
      return err
    }
  }
}

export { IndexAppointmentsUseCase }
