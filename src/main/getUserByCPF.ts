import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { GetUserByCPFUseCase } from "@useCases/getUserByCPF/GetUserByCPFUseCase"
import { GetUserByCPFController } from "@controllers/GetUserByCPFController"

function GetUserByCPFControllerFactory() {
  const userRepository = new UserRepository()

  const getUserByCPFUseCase = new GetUserByCPFUseCase(userRepository)

  const getUserByCPFController = new GetUserByCPFController(getUserByCPFUseCase)

  return getUserByCPFController
}

const getUserByCPFController = GetUserByCPFControllerFactory()

export { getUserByCPFController }
