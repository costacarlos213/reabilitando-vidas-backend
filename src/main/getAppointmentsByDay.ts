import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { GetAppointmentByDateUseCase } from "@useCases/getAppointmentByDateTime/GetAppointmentByDateUseCase"
import { GetAppointmentByDateController } from "src/controllers/GetAppointmentsByDayController"

function getAppointmentsByDayControllerFactory() {
  const appointmentRepository = new AppointmentRepository()

  const getAppointmentsByDayUseCase = new GetAppointmentByDateUseCase(
    appointmentRepository
  )

  const getAppointmentsByDayController = new GetAppointmentByDateController(
    getAppointmentsByDayUseCase
  )

  return getAppointmentsByDayController
}

const getAppointmentsByDayController = getAppointmentsByDayControllerFactory()

export { getAppointmentsByDayController }
