import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUpdateAppointmentFields } from "./UpdateAppointmentUseCaseDTO"

class UpdateAppointmentUseCase {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute(fieldsToUpdate: IUpdateAppointmentFields): Promise<void> {
    const { id, user, ...rest } = fieldsToUpdate

    if (!id) {
      throw new Error("Missing id")
    }

    await this.appointmentRepository.updateAppointment(
      {
        ...rest,
        user: {
          update: {
            ...user
          }
        }
      },
      parseInt(id)
    )
  }
}

export { UpdateAppointmentUseCase }
