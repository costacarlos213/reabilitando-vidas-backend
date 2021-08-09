import IORedis from "ioredis"

const connection = new IORedis(parseInt(process.env.REDIS_PORT || "6379"))

export default {
  queueName: "mailbot",
  concurrency: 5,
  limiter: {
    max: 5,
    duration: 1500
  },
  connection: connection.duplicate()
}
