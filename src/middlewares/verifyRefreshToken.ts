import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { redis } from "src/database/redis"

export function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const token = req.body.token

  if (!token) return res.status(401).json({ message: "Missing token." })

  try {
    const decoded = verify(token, process.env.JWT_REFRESH_SECRET)

    req.body = {
      ...req.body,
      userData: decoded
    }

    redis.get(decoded.sub.toString(), (err, data) => {
      if (err) throw err

      if (!data)
        return res.status(401).json({ message: "Refresh token isn't stored." })

      if (JSON.parse(data).token !== token)
        return res.status(401).json({ message: "Wrong refresh token." })

      next()
    })
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid session", data: error.message })
  }
}
