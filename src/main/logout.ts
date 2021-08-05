import { LogoutUseCase } from "@useCases/logout/LogoutUseCase"
import { LogoutController } from "src/controllers/LogoutController"

function LogoutControllerFactory() {
  const logoutUseCase = new LogoutUseCase()

  const logoutController = new LogoutController(logoutUseCase)

  return logoutController
}

const logoutController = LogoutControllerFactory()

export { logoutController }
