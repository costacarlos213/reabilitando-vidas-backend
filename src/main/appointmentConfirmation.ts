import { AppointmentConfirmationController } from "@controllers/AppointmentConfirmationController"
import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"
import { AppointmentConfirmationUseCase } from "@useCases/appointmentConfirmation/AppointmentConfirmationUseCase"

function AppointmentConfirmationControllerFactory() {
  const tokenRepository = new TokenRepository()
  const appointmentRepository = new AppointmentRepository()

  const appointmentConfirmationUseCase = new AppointmentConfirmationUseCase(
    tokenRepository,
    appointmentRepository
  )

  const appointmentConfirmationController =
    new AppointmentConfirmationController(appointmentConfirmationUseCase)

  return appointmentConfirmationController
}

const appointmentConfirmationController =
  AppointmentConfirmationControllerFactory()

export { appointmentConfirmationController }
