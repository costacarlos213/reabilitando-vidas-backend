import Redis from "ioredis"

const redis = new Redis(
  parseInt(process.env.REDIS_PORT || "6379"),
  process.env.REDIS_HOST
)

export { redis }
