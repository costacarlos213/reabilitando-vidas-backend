import { AccessTokenProvider } from "@providers/token/generateAccessToken"
import { IRefreshTokenDTO } from "./RefreshTokenDTO"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({
    userId,
    refreshToken,
    staff
  }: IRefreshTokenDTO): Promise<string> {
    if (!userId || !refreshToken) {
      throw new Error("Missing token or userId.")
    }

    const accessToken = AccessTokenProvider(userId, staff)

    return accessToken
  }
}

export { RefreshTokenUseCase }
