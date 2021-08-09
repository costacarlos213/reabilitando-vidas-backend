import { verify } from "jsonwebtoken"
import { AccessTokenProvider } from "@providers/token/generateAccessToken"
import { IRefreshTokenDTO } from "./RefreshTokenDTO"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(userData: IRefreshTokenDTO): Promise<string> {
    const { userId, refreshToken, token } = userData

    if (!userId || !token || !refreshToken) {
      throw new Error("Missing token or userId.")
    }

    const decoded = await verify(token, process.env.JWT_AUTH_SECRET)

    if (decoded.sub !== userId) {
      throw new Error("Wrong refresh token")
    }

    const accessToken = AccessTokenProvider(userId)

    this.tokenRepository.set("BL_" + userId, JSON.stringify({ token: token }))

    return accessToken
  }
}

export { RefreshTokenUseCase }
