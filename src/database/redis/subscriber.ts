import Redis, { Redis as RedisType } from "ioredis"

export class Subscriber {
  private sub: RedisType

  constructor() {
    this.sub = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      db: 0
    })
  }

  execute(channel: string): void {
    this.sub.subscribe(channel)
  }

  on(event: string, listener: (...args) => void): void {
    this.sub.on(event, (channel, message) => {
      listener(channel, message)
    })
  }
}
