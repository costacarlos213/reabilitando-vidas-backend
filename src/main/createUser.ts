import { UserRepository } from "@repositories/userRepository/implementation/UserRepository"
import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase"
import { CreateUserController } from "@controllers/CreateUserController"
import { MailProvider } from "@providers/mail/implementation/MailProvider"
import queueOptions from "@config/queue"
import { TokenRepository } from "@repositories/tokenRepository/implementation/TokenRepository"
import { ConfirmationProvider } from "@providers/confirmation/implementation/ConfirmationProvider"

function CreateUserControllerFactory() {
  const userRepository = new UserRepository()
  const mailProvider = new MailProvider({
    connection: queueOptions.connection
  })
  const tokenRepository = new TokenRepository()
  const confirmationProvider = new ConfirmationProvider(
    tokenRepository,
    mailProvider
  )

  const createUserUseCase = new CreateUserUseCase(
    userRepository,
    confirmationProvider
  )

  const createUserController = new CreateUserController(createUserUseCase)

  return createUserController
}

const createUserController = CreateUserControllerFactory()

export { createUserController }
