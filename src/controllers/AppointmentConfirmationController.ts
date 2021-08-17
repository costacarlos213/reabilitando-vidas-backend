import { AppointmentConfirmationUseCase } from "@useCases/appointmentConfirmation/AppointmentConfirmationUseCase"
import { Request, Response } from "express"

class AppointmentConfirmationController {
  constructor(
    private appointmentConfirmationUseCase: AppointmentConfirmationUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.appointmentConfirmationUseCase.execute(req.params.token)

      return res.status(200).json({
        message: "Your appointment has been confirmed."
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export { AppointmentConfirmationController }
