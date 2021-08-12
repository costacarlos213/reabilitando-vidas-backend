import { ICreateUserDTO } from "./CreateUserDTO"
import { UserRepository } from "../../repositories/userRepository/implementation/UserRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { MailProvider } from "@providers/mail/implementation/MailProvider"
import queueOptions from "@config/queue"
import { redis } from "@database/redis/redis"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"

describe("Create user use case tests", () => {
  const userRepo = new UserRepository()
  const mailProvider = new MailProvider({
    connection: queueOptions.connection
  })
  const tokenRepo = new TokenRepository()

  const userUseCase = new CreateUserUseCase(userRepo, mailProvider, tokenRepo)
  const prisma = new PrismaClient()

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        name: "Carlos Costa"
      }
    })
  })

  afterAll(async () => {
    await mailProvider.close()

    await new Promise<void>(resolve => {
      redis.quit(() => {
        resolve()
      })
    })

    await new Promise(resolve => setImmediate(resolve))
  })

  test("Create User only with phone", async () => {
    const options: ICreateUserDTO = {
      cpf: "74482034010",
      name: "Carlos Costa",
      phone: "12943221953",
      password: "el di"
    }

    const executeUseCase = async () => {
      return await userUseCase.execute(options)
    }

    const response = await executeUseCase()

    return expect(response).toBeNull()
  })

  test("Create User only with email", async () => {
    const options: ICreateUserDTO = {
      cpf: "74482034010",
      name: "Carlos Costa",
      email: "carloscosta2912@gmail.com",
      password: "el di"
    }

    const executeUseCase = async () => {
      return await userUseCase.execute(options)
    }

    const response = await executeUseCase()

    return expect(response).toBeNull()
  })

  test.only("New User", async () => {
    const options: ICreateUserDTO = {
      cpf: "74482034010",
      email: "examplemailt@gmail.com",
      name: "Carlos Costa",
      phone: "12943221953",
      password: "el di"
    }

    const executeUseCase = async () => {
      return await userUseCase.execute(options)
    }

    const response = await executeUseCase()

    return expect(response).toBeNull()
  })

  test("User Already exists", async () => {
    const optionsToUseCase: ICreateUserDTO = {
      cpf: "81356519024",
      email: "exemail@gmail.com",
      name: "Carlos Costa",
      phone: "12943251753",
      password: "El di"
    }

    const optionsToPrisma = {
      cpf: "81356519024",
      email: "exmail@gmail.com",
      name: "Carlos Costa",
      phone: "12943251753",
      password: "El di"
    }

    await prisma.user.create({
      data: optionsToPrisma
    })

    await expect(userUseCase.execute(optionsToUseCase)).resolves.toThrowError()
  })

  test("User without password", async () => {
    const options = {
      cpf: "983.532.650-95",
      email: "examplemailt@gmail.com",
      name: "Carlos Costa",
      phone: "12943221953"
    }

    const executeUseCase = async () => {
      return await userUseCase.execute(options)
    }

    const response = await executeUseCase()

    const newUser = await prisma.user.findUnique({
      where: {
        cpf: "983.532.650-95"
      }
    })

    expect(response).toBeNull()
    expect(await bcrypt.compare(options.cpf, newUser.password)).toBeTruthy()
  })
})
