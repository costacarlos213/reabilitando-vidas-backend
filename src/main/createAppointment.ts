import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { CreateAppointmentUseCase } from "@useCases/createAppointment/CreateAppointmentUseCase"
import { CreateAppointmentController } from "src/controllers/CreateAppointmentController"

async function CreateAppointmentControllerFactory() {
  const appointmentRepository = new AppointmentRepository()
  const userRepository = new UserRepository()

  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    userRepository
  )

  const createAppointmentController = new CreateAppointmentController(
    createAppointmentUseCase
  )

  return createAppointmentController
}

const createAppointmentController = CreateAppointmentControllerFactory()

export { createAppointmentController }
