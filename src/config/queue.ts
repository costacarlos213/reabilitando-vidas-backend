import IORedis from "ioredis"

const connection = new IORedis({
  port: parseInt(process.env.REDIS_PORT || "6379"),
  host: process.env.REDIS_HOST || "127.0.0.1",
  db: 1
})

export default {
  queueName: "mailbot",
  concurrency: 5,
  limiter: {
    max: 5,
    duration: 1500
  },
  connection: connection.duplicate()
}
