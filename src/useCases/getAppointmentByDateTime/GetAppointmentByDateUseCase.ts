import { dayAppointments } from "@repositories/appointmentRepository/AppointmentRepository"
import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"

class GetAppointmentByDateUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(date: string): Promise<dayAppointments[] | Error> {
    try {
      const dayAppointments =
        await this.appointmentRepository.getDayAppointments(date)

      if (!dayAppointments) {
        return null
      }

      return dayAppointments
    } catch (error) {
      return error
    }
  }
}

export { GetAppointmentByDateUseCase }
