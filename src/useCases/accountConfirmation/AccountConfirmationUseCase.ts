import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"

class AccountConfirmationUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(confirmationToken: string): Promise<void | Error> {
    try {
      const userId = await this.tokenRepository.get("CMT_" + confirmationToken)

      if (userId) {
        await this.userRepository.updateStatus(
          "ACTIVE",
          JSON.parse(userId).userId
        )
        this.tokenRepository.del("CMT_" + confirmationToken)
      } else {
        return new Error("Invalid confirmation link.")
      }
    } catch (error) {
      return error
    }
  }
}

export { AccountConfirmationUseCase }
