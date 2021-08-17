import { GetAppointmentByDateUseCase } from "@useCases/getAppointmentByDateTime/GetAppointmentByDateUseCase"
import { Request, Response } from "express"

class GetAppointmentByDateController {
  constructor(
    private getAppointmentByDateUseCase: GetAppointmentByDateUseCase
  ) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const { initialDate, finalDate, userData } = req.body

    try {
      const appointments = await this.getAppointmentByDateUseCase.execute(
        {
          initialDate,
          finalDate
        },
        userData.sub
      )

      if (appointments instanceof Error) {
        return res.status(400).json({
          message: appointments.message
        })
      }

      return res.status(200).json({
        appointments
      })
    } catch (err) {
      return res.status(500).json({
        message: "The application has encountered an error.",
        error: err.message
      })
    }
  }
}

export { GetAppointmentByDateController }
