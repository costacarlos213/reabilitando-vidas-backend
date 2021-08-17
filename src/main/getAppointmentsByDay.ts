import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { GetAppointmentByDateUseCase } from "@useCases/getAppointmentByDateTime/GetAppointmentByDateUseCase"
import { GetAppointmentByDateController } from "@controllers/GetAppointmentsByDayController"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"

function getAppointmentsByDayControllerFactory() {
  const appointmentRepository = new AppointmentRepository()
  const userRepository = new UserRepository()

  const getAppointmentsByDayUseCase = new GetAppointmentByDateUseCase(
    appointmentRepository,
    userRepository
  )

  const getAppointmentsByDayController = new GetAppointmentByDateController(
    getAppointmentsByDayUseCase
  )

  return getAppointmentsByDayController
}

const getAppointmentsByDayController = getAppointmentsByDayControllerFactory()

export { getAppointmentsByDayController }
