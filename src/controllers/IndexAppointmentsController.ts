import { IndexAppointmentsUseCase } from "@useCases/indexAppointments/IndexAppointmentsUseCase"
import { Request, Response } from "express"

class IndexAppointmentsController {
  constructor(private indexAppointmentsUseCase: IndexAppointmentsUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    try {
      const appointments = await this.indexAppointmentsUseCase.execute()

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
        error: err
      })
    }
  }
}

export { IndexAppointmentsController }
