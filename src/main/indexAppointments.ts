import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { IndexAppointmentsUseCase } from "@useCases/indexAppointments/IndexAppointmentsUseCase"
import { IndexAppointmentsController } from "src/controllers/IndexAppointmentsController"

function IndexAppointmentsControllerFactory() {
  const appointmentRepository = new AppointmentRepository()

  const indexAppointmentsUseCase = new IndexAppointmentsUseCase(
    appointmentRepository
  )

  const indexAppointmentsController = new IndexAppointmentsController(
    indexAppointmentsUseCase
  )

  return indexAppointmentsController
}

const indexAppointmentsController = IndexAppointmentsControllerFactory()

export { indexAppointmentsController }
