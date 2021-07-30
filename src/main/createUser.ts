import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase"
import { CreateUserController } from "src/controllers/CreateUserController"

function CreateUserControllerFactory() {
  const userRepository = new UserRepository()

  const createUserUseCase = new CreateUserUseCase(userRepository)

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

const createUserController = CreateUserControllerFactory()

export { createUserController }
