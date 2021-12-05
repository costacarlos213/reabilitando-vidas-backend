import queue from "@config/queue"
import { DeleteAppointmentController } from "@controllers/DeleteAppointmentController"

import { MailProvider } from "@providers/mail/implementation/MailProvider"
import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { DeleteAppointmentUseCase } from "@useCases/deleteAppointment/deleteAppointmentUseCase"

function DeleteAppointmentControllerFactory() {
  const appointmentRepository = new AppointmentRepository()
  const mailProvider = new MailProvider({ connection: queue.connection })

  const deleteAppointmentUseCase = new DeleteAppointmentUseCase(
    appointmentRepository,
    mailProvider
  )

  const deleteAppointmentController = new DeleteAppointmentController(
    deleteAppointmentUseCase
  )

  return deleteAppointmentController
}

const deleteAppointmentController = DeleteAppointmentControllerFactory()

export { deleteAppointmentController }
