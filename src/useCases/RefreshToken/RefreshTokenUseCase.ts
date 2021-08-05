import { verify } from "jsonwebtoken"
import { redis } from "../../database/redis"
import { generateAccessToken } from "../../providers/generateAccessToken"
import { IRefreshTokenDTO } from "./RefreshTokenDTO"

class RefreshTokenUseCase {
  async execute(userData: IRefreshTokenDTO): Promise<string> {
    const { userId, refreshToken, token } = userData

    if (!userId || !token || !refreshToken) {
      throw new Error("Missing token or userId.")
    }

    await verify(token, process.env.JWT_AUTH_SECRET)

    const accessToken = generateAccessToken(userId)

    redis.set("BL_" + userId, JSON.stringify({ token: token }))

    return accessToken
  }
}

export { RefreshTokenUseCase }
