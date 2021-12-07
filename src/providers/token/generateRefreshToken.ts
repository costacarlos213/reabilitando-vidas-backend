import { sign } from "jsonwebtoken"

export function RefreshTokenProvider(userId: string, staff: boolean): string {
  const refreshToken = sign(
    { sub: userId, staff },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TIME
    }
  )

  return refreshToken
}
