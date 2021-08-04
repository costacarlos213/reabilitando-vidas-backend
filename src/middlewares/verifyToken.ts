import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { redis } from "src/database/redis"

export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  try {
    const authToken = req.headers.authorization

    if (!authToken) throw new Error("Token is missing")

    const token = req.headers.authorization.split(" ")[1]

    const decoded = verify(token, process.env.JWT_AUTH_SECRET)

    req.body = {
      ...req.body,
      userData: decoded,
      token
    }

    redis.get("BL_" + decoded.sub.toString(), (err, data) => {
      if (err) throw err

      if (data === token)
        return res
          .status(401)
          .json({ message: "Trying to login with blacklisted token" })

      next()
    })
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Session",
      data: error.message
    })
  }
}
