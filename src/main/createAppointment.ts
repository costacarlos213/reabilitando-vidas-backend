import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { CreateAppointmentUseCase } from "@useCases/createAppointment/CreateAppointmentUseCase"
import { CreateAppointmentController } from "@controllers/CreateAppointmentController"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"
import { MailProvider } from "@providers/mail/implementation/MailProvider"
import queue from "@config/queue"
import { ConfirmationProvider } from "@providers/confirmation/implementation/ConfirmationProvider"

function CreateAppointmentControllerFactory() {
  const appointmentRepository = new AppointmentRepository()
  const userRepository = new UserRepository()
  const tokenRepository = new TokenRepository()
  const mailProvider = new MailProvider({
    connection: queue.connection
  })
  const confirmationProvider = new ConfirmationProvider(
    tokenRepository,
    mailProvider
  )

  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    userRepository,
    confirmationProvider
  )

  const createAppointmentController = new CreateAppointmentController(
    createAppointmentUseCase
  )

  return createAppointmentController
}

const createAppointmentController = CreateAppointmentControllerFactory()

export { createAppointmentController }
