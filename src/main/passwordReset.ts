import queue from "@config/queue"
import { PasswordResetController } from "@controllers/PasswordResetController"
import { MailProvider } from "@providers/mail/implementation/MailProvider"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"
import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { PasswordResetUseCase } from "@useCases/passwordReset/PasswordResetUseCase"

function PasswordResetControllerFactory() {
  const userRepository = new UserRepository()
  const mailProvider = new MailProvider({
    connection: queue.connection
  })
  const tokenRepository = new TokenRepository()

  const passwordResetUseCase = new PasswordResetUseCase(
    userRepository,
    tokenRepository,
    mailProvider
  )

  const passwordResetController = new PasswordResetController(
    passwordResetUseCase
  )

  return passwordResetController
}

const passwordResetController = PasswordResetControllerFactory()

export { passwordResetController }
