import { RefreshTokenUseCase } from "@useCases/RefreshToken/RefreshTokenUseCase"
import { RefreshTokenController } from "src/controllers/RefreshTokenController"

function RefreshTokenControllerFactory() {
  const refreshTokenUseCase = new RefreshTokenUseCase()

  const refreshTokenController = new RefreshTokenController(refreshTokenUseCase)

  return refreshTokenController
}

const refreshTokenController = RefreshTokenControllerFactory()

export { refreshTokenController }
