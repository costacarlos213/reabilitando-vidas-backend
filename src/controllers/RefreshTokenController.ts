import { RefreshTokenUseCase } from "@useCases/RefreshToken/RefreshTokenUseCase"
import { Request, Response } from "express"

class RefreshTokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const accessToken = await this.refreshTokenUseCase.execute(
        req.body.userData.sub
      )

      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }
}

export { RefreshTokenController }
