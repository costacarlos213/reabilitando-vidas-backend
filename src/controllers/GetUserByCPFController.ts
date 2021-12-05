import { GetUserByCPFUseCase } from "@useCases/getUserByCPF/GetUserByCPFUseCase"
import { Request, Response } from "express"

class GetUserByCPFController {
  constructor(private getUserByCPFController: GetUserByCPFUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.query

    if (!cpf) {
      return res.status(400).json({
        message: "Missing key."
      })
    }

    try {
      const user = await this.getUserByCPFController.execute(cpf.toString())

      delete user.password

      return res.status(200).json(user)
    } catch (err) {
      return res.status(400).json({
        message: "The application has encountered an error.",
        error: err.message
      })
    }
  }
}

export { GetUserByCPFController }
