import {
  dayAppointments,
  IAppointmentRepository
} from "@repositories/appointmentRepository/AppointmentRepository"
import dayjs from "dayjs"
import { IGetAppointmentsByDayDTO } from "./GetAppointmentsByDayDTO"

class GetAppointmentByDateUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(
    dateInterval: IGetAppointmentsByDayDTO
  ): Promise<dayAppointments[] | Error> {
    let finalDate: string = dayjs(dateInterval.finalDate).toISOString()
    const initialDate = dayjs(dateInterval.initialDate).toISOString()

    if (dateInterval.initialDate === dateInterval.finalDate) {
      finalDate = dayjs(dateInterval.finalDate).add(1, "day").toISOString()
    }

    try {
      const dayAppointments =
        await this.appointmentRepository.getDayAppointments(
          initialDate,
          finalDate
        )

      return dayAppointments
    } catch (error) {
      return error
    }
  }
}

export { GetAppointmentByDateUseCase }
