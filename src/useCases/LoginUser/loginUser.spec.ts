import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { LoginUserUseCase } from "./LoginUserUseCase"
import { prisma } from "../../database/client"
import bcrypt from "bcrypt"
import { redis } from "../../database/redis"

describe("Login user tests", () => {
  const userRepo = new UserRepository()

  const loginUserUseCase = new LoginUserUseCase(userRepo, redis)

  beforeAll(async () => {
    const hash = await bcrypt.hash("carlitos13", 8)

    await prisma.user.create({
      data: {
        name: "Murilo Costa",
        cpf: "20212205080",
        password: hash,
        email: "murilin@email.com",
        phone: "11999126923"
      }
    })
  })

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        cpf: "20212205080"
      }
    })

    await new Promise<void>(resolve => {
      redis.quit(() => {
        resolve()
      })
    })

    await new Promise(resolve => setImmediate(resolve))
  })

  test("Login User with email", async () => {
    await expect(
      loginUserUseCase.execute({
        login: "murilin@email.com",
        password: "carlitos13"
      })
    ).resolves.toHaveProperty("accessToken")
  })

  test("Login User with phone", async () => {
    await expect(
      loginUserUseCase.execute({
        login: "11999126923",
        password: "carlitos13"
      })
    ).resolves.toHaveProperty("accessToken")
  })

  test("Wrong creds", async () => {
    await expect(
      loginUserUseCase.execute({
        login: "murilin@email.com",
        password: "carlitos"
      })
    ).resolves.toThrowError()
  })
})
