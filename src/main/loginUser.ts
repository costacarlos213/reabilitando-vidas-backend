import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { LoginUserUseCase } from "@useCases/LoginUser/LoginUserUseCase"
import { LoginUserController } from "@controllers/LoginUserController"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"

function LoginControllerFactory() {
  const userRepository = new UserRepository()
  const tokenRepository = new TokenRepository()

  const loginUserUseCase = new LoginUserUseCase(userRepository, tokenRepository)

  const loginUserController = new LoginUserController(loginUserUseCase)

  return loginUserController
}

const loginUserController = LoginControllerFactory()

export { loginUserController }
