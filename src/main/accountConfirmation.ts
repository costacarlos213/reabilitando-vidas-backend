import { AccountConfirmationController } from "@controllers/AccountConfirmationController"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { AccountConfirmationUseCase } from "@useCases/accountConfirmation/AccountConfirmationUseCase"

function accountConfirmationControllerFactory() {
  const tokenRepository = new TokenRepository()
  const userRepository = new UserRepository()

  const accountConfirmationUseCase = new AccountConfirmationUseCase(
    tokenRepository,
    userRepository
  )

  const accountConfirmationController = new AccountConfirmationController(
    accountConfirmationUseCase
  )

  return accountConfirmationController
}

const accountConfirmationController = accountConfirmationControllerFactory()

export { accountConfirmationController }
