import {
  dayAppointments,
  IAppointmentRepository
} from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { NonStaffUserError } from "@useCases/errors/NonStaffUserError"
import dayjs from "dayjs"
import { IGetAppointmentsByDayDTO } from "./GetAppointmentsByDayDTO"

class GetAppointmentByDateUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    dateInterval: IGetAppointmentsByDayDTO,
    userId: string
  ): Promise<dayAppointments[] | Error> {
    const staffUser = await this.userRepository.getUniqueUser({
      id: userId
    })

    if (!staffUser.staff) {
      return new NonStaffUserError()
    }

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
