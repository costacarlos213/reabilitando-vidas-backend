import { redis } from "@database/redis/redis"
import { Subscriber } from "@database/redis/subscriber"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { ISetValue, ITokenRepository } from "../ITokenRepository"

function handleExpiredKeyEvent(): void {
  const subscriber = new Subscriber()
  const userRepo = new UserRepository()

  subscriber.execute("__keyevent@0__:expired")
  subscriber.on("message", async (channel: string, message: string) => {
    if (message.startsWith("CMT_")) {
      const [, , userId] = message.split("_")

      userRepo.deleteUser(userId)
    }
  })
}

class TokenRepository implements ITokenRepository {
  async del(key: string): Promise<void> {
    redis.del(key)
  }

  async set(keyValue: ISetValue): Promise<void> {
    const { key, value, expiration } = keyValue

    if (expiration) {
      redis.set(key, value, "ex", expiration)
    } else {
      redis.set(key, value)
    }
  }

  async get(key: string): Promise<string> {
    return redis.get(key)
  }

  async deleleteByPattern(key: string): Promise<void> {
    const stream = redis.scanStream({
      match: `${key}*`
    })

    stream.on("data", matchedKey => {
      redis.unlink(matchedKey)
    })
  }

  getByPattern(key: string): Promise<string> {
    return new Promise<string>(resolve => {
      const stream = redis.scanStream({
        match: `${key}*`
      })

      let entireKey: string

      stream.on("data", matchedKey => {
        entireKey = matchedKey[0]
      })

      stream.on("end", async () => {
        const userId = await this.get(entireKey)

        resolve(userId)
      })
    })
  }
}

export { TokenRepository, handleExpiredKeyEvent }
