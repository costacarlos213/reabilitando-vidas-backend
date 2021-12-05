import { UpdateAppointmentUseCase } from "@useCases/updateAppointment/UpdateAppointmentUseCase"
import { Request, Response } from "express"

class UpdateAppointmentController {
  constructor(private updateAppointmentUseCase: UpdateAppointmentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { appointmentId, ...rest } = req.body

    try {
      await this.updateAppointmentUseCase.execute(rest, appointmentId)

      return res.status(200).json({
        message: "updated."
      })
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { UpdateAppointmentController }
