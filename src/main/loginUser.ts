import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { LoginUserUseCase } from "@useCases/LoginUser/LoginUserUseCase"
import { LoginUserController } from "src/controllers/LoginUserController"

function LoginControllerFactory() {
  const userRepository = new UserRepository()

  const loginUserUseCase = new LoginUserUseCase(userRepository)

  const loginUserController = new LoginUserController(loginUserUseCase)

  return loginUserController
}

const loginUserController = LoginControllerFactory()

export { loginUserController }
