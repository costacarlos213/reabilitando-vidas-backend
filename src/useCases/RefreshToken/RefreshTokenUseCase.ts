import { AccessTokenProvider } from "@providers/token/generateAccessToken"
import { IRefreshTokenDTO } from "./RefreshTokenDTO"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(userData: IRefreshTokenDTO): Promise<string> {
    const { userId, refreshToken } = userData

    if (!userId || !refreshToken) {
      throw new Error("Missing token or userId.")
    }

    const accessToken = AccessTokenProvider(userId)

    return accessToken
  }
}

export { RefreshTokenUseCase }
