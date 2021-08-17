import { CreateAppointmentUseCase } from "@useCases/createAppointment/CreateAppointmentUseCase"
import { Response, Request } from "express"

class CreateAppointmentController {
  constructor(private createAppointmentUseCase: CreateAppointmentUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const { cpf, dateTime, userData } = req.body

    try {
      const AppointmentUseCaseResponse =
        await this.createAppointmentUseCase.execute({
          cpf,
          userId: userData.sub,
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
        message: error.message
      })
    }
  }
}

export { CreateAppointmentController }
