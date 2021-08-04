import { LoginUserUseCase } from "@useCases/LoginUser/LoginUserUseCase"
import { Request, Response } from "express"

class LoginUserController {
  constructor(private loginUser: LoginUserUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const login = req.body.login
    const password = req.body.password

    try {
      const token = await this.loginUser.execute({
        login,
        password
      })

      if (token instanceof Error) {
        return res.status(400).json({
          message: token.message
        })
      }

      return res.status(200).json(token)
    } catch (err) {
      return res.status(500).json({
        message: "The application has encountered an error.",
        error: err
      })
    }
  }
}

export { LoginUserController }
