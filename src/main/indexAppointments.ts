import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { IndexAppointmentsUseCase } from "@useCases/indexAppointments/IndexAppointmentsUseCase"
import { IndexAppointmentsController } from "@controllers/IndexAppointmentsController"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"

function IndexAppointmentsControllerFactory() {
  const appointmentRepository = new AppointmentRepository()
  const userRepository = new UserRepository()

  const indexAppointmentsUseCase = new IndexAppointmentsUseCase(
    appointmentRepository,
    userRepository
  )

  const indexAppointmentsController = new IndexAppointmentsController(
    indexAppointmentsUseCase
  )

  return indexAppointmentsController
}

const indexAppointmentsController = IndexAppointmentsControllerFactory()

export { indexAppointmentsController }
