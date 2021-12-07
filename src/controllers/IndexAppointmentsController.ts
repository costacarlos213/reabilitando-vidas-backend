import { IndexAppointmentsUseCase } from "@useCases/indexAppointments/IndexAppointmentsUseCase"
import { Request, Response } from "express"

class IndexAppointmentsController {
  constructor(private indexAppointmentsUseCase: IndexAppointmentsUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const { userData } = req.body

    try {
      const appointments = await this.indexAppointmentsUseCase.execute({
        userId: userData.sub,
        staff: userData.staff,
        filters: {
          ...req.query,
          id: parseInt(req.query?.id?.toString())
        }
      })

      return res.status(200).json({
        appointments
      })
    } catch (err) {
      console.log(err)

      return res.status(400).json({
        error: err.message
      })
    }
  }
}

export { IndexAppointmentsController }
