import { AccountConfirmationUseCase } from "@useCases/accountConfirmation/AccountConfirmationUseCase"
import { Request, Response } from "express"

class AccountConfirmationController {
  constructor(private accountConfirmationUseCase: AccountConfirmationUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const voidOrError = await this.accountConfirmationUseCase.execute(
        req.params.token
      )

      if (voidOrError instanceof Error) {
        return res.status(400).json({
          error: voidOrError.message
        })
      }

      return res.status(200).json({
        message: "Your account has been confirmed."
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message
      })
    }
  }
}

export { AccountConfirmationController }
