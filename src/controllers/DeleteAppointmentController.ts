import { DeleteAppointmentUseCase } from "@useCases/deleteAppointment/deleteAppointmentUseCase"
import { Request, Response } from "express"

class DeleteAppointmentController {
  constructor(private deleteAppointmentUseCase: DeleteAppointmentUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { appointmentId, jobId } = req.query

    if (!appointmentId || !jobId) {
      return res.status(400).json({
        message: "Missing delete options."
      })
    }

    try {
      await this.deleteAppointmentUseCase.execute({
        appointmentId: parseInt(appointmentId.toString()),
        jobId: jobId.toString()
      })

      return res.status(200).json()
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

export { DeleteAppointmentController }
