import { createClient } from "redis"

const redis = createClient(6379, "127.0.0.1")

redis.on("connect", () => {
  console.log("connected on redis")
})

export { redis }
