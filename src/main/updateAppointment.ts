import { UpdateAppointmentController } from "@controllers/UpdateAppointmentController"
import { AppointmentRepository } from "@repositories/appointmentRepository/implementation/AppointmentRepository"
import { UpdateAppointmentUseCase } from "@useCases/updateAppointment/UpdateAppointmentUseCase"

function updateAppointmentControllerFactory() {
  const appointmentRepository = new AppointmentRepository()

  const updateAppointmentUseCase = new UpdateAppointmentUseCase(
    appointmentRepository
  )

  const updateAppointmentController = new UpdateAppointmentController(
    updateAppointmentUseCase
  )

  return updateAppointmentController
}

const updateAppointmentController = updateAppointmentControllerFactory()

export { updateAppointmentController }
