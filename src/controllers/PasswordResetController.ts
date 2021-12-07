import { UserDoNotExistsError } from "@useCases/errors/UserDoNotExistsError"
import { PasswordResetUseCase } from "@useCases/passwordReset/PasswordResetUseCase"
import { Request, Response } from "express"

class PasswordResetController {
  constructor(private passwordResetUseCase: PasswordResetUseCase) {}

  async handleRequest(req: Request, res: Response): Promise<Response> {
    try {
      await this.passwordResetUseCase.executeRequest(req.query.email.toString())

      return res.status(200).json({
        message:
          "If this email is in our database, a reset link has been sent to your mailbox."
      })
    } catch (err) {
      if (err instanceof UserDoNotExistsError) {
        return res.status(200).json({
          message:
            "If this email is in our database, a reset link has been sent to your mailbox."
        })
      }

      return res.status(500).json({ message: err.message })
    }
  }

  async handleReset(req: Request, res: Response): Promise<Response> {
    try {
      await this.passwordResetUseCase.executeReset({
        token: req.body.token,
        password: req.body.password
      })

      return res.status(200).json({
        message: "Password has been reset."
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export { PasswordResetController }
