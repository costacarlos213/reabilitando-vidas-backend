import { redis } from "@database/redis/redis"
import { RefreshTokenUseCase } from "./RefreshTokenUseCase"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"

describe("Refresh Token test", () => {
  const tokenRepo = new TokenRepository()

  const refreshToken = new RefreshTokenUseCase(tokenRepo)

  afterAll(async () => {
    await new Promise<void>(resolve => {
      redis.quit(() => {
        resolve()
      })
    })

    await new Promise(resolve => setImmediate(resolve))
  })

  test("Missing refresh token", async () => {
    await expect(
      refreshToken.execute({
        refreshToken: undefined,
        userId: "1"
      })
    ).rejects.toThrowError("Missing token or userId.")
  })

  test("Missing userId", async () => {
    await expect(
      refreshToken.execute({
        refreshToken: "abc123dfg",
        userId: undefined
      })
    ).rejects.toThrowError()
  })
})
