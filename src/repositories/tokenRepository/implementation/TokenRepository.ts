import { redis } from "@database/redis"
import { ITokenRepository } from "../ITokenRepository"

class TokenRepository implements ITokenRepository {
  async set(key: string, value: string, expiry?: boolean): Promise<void> {
    if (expiry) {
      redis.set(key, value, "ex", 60 * 60 * 24)
    } else {
      redis.set(key, value)
    }
  }

  async get(key: string): Promise<string> {
    return redis.get(key)
  }

  async del(key: string): Promise<void> {
    redis.del(key)
  }
}

export { TokenRepository }
