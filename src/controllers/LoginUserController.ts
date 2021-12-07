import { LoginUserUseCase } from "@useCases/LoginUser/LoginUserUseCase"
import { Request, Response } from "express"

class LoginUserController {
  constructor(private loginUser: LoginUserUseCase) {}

  async handler(req: Request, res: Response): Promise<Response> {
    const { login, password } = req.body

    try {
      const tokens = await this.loginUser.execute({
        login,
        password
      })

      res.cookie("vidas.access-token", tokens.accessToken, {
        path: "/",
        sameSite: "lax",
        maxAge: 30 * 1000 // 30s
      })

      res.cookie("JID", tokens.refreshToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
      })

      return res.status(200).json(tokens)
    } catch (err) {
      return res.status(401).json({
        message: err.message
      })
    }
  }
}

export { LoginUserController }
