import { CreateAppointmentUseCase } from "@useCases/createAppointment/CreateAppointmentUseCase"
import { Response, Request } from "express"

class CreateAppointmentController {
  constructor(private createAppointmentUseCase: CreateAppointmentUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const { cpf, dateTime } = req.body

    try {
      const AppointmentUseCaseResponse =
        await this.createAppointmentUseCase.execute({
          cpf,
          dateTime
        })

      if (AppointmentUseCaseResponse instanceof Error) {
        return res.status(400).json({
          message: AppointmentUseCaseResponse.message
        })
      }

      return res.status(201).json()
    } catch (error) {
      return res.status(500).json({
        message: error
      })
    }
  }
}

export { CreateAppointmentController }
