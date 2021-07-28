import { ICreateUserDTO } from "./ICreateUserDTO"
import { UserRepository } from "../../repositories/userRepository/implementation/UserRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

describe("Create user use case tests", () => {
  const userRepo = new UserRepository()
  const userUseCase = new CreateUserUseCase(userRepo)
  const prisma = new PrismaClient()

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        name: "Carlos Costa"
      }
    })
  })

  test("New User", async () => {
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
