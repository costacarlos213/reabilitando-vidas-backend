import { sign } from "jsonwebtoken"
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
    const token = sign({ sub: "1" }, process.env.JWT_AUTH_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME
    })

    await expect(
      refreshToken.execute({
        refreshToken: undefined,
        userId: "1",
        token
      })
    ).rejects.toThrowError("Missing token or userId.")
  })

  test("Missing userId", async () => {
    const token = sign({ sub: "1" }, process.env.JWT_AUTH_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME
    })

    await expect(
      refreshToken.execute({
        refreshToken: "abc123dfg",
        userId: undefined,
        token
      })
    ).rejects.toThrowError()
  })

  test("Blacklisted token", async () => {
    const token = sign({ sub: "1" }, process.env.JWT_AUTH_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME
    })

    await refreshToken.execute({
      refreshToken: "abc123dfg",
      userId: "1",
      token
    })

    redis.get("BL_1", (err, data) => {
      if (err) throw err

      expect(JSON.parse(data).token).toEqual(token)
    })
  })
})
