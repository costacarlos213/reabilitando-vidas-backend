import { sign } from "jsonwebtoken"
import { redis } from "../database/redis"

export function generateRefreshToken(userId: string): string {
  const refreshToken = sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME
  })

  redis.set(userId, JSON.stringify({ token: refreshToken }))

  return refreshToken
}
