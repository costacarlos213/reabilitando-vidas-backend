import { redis } from "src/database/redis"
import { ILogoutDTO } from "./LogoutDTO"

class LogoutUseCase {
  async execute(userData: ILogoutDTO): Promise<void> {
    const { token, userId } = userData

    if (!token || !userId) throw new Error("Missing token or userId")

    redis.del(userId)

    redis.set("BL_" + userId, JSON.stringify({ token }))
  }
}

export { LogoutUseCase }
