import Redis from "ioredis"

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT || "6379"),
  db: 0
})

redis.on("ready", () => {
  redis.config("SET", "notify-keyspace-events", "Ex")
})

export { redis }
