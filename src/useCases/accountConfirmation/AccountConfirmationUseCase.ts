import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"

class AccountConfirmationUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(confirmationToken: string): Promise<void | Error> {
    try {
      const userId = await this.tokenRepository.getByPattern(
        `CMT_${confirmationToken}_`
      )

      if (userId) {
        await this.userRepository.updateUser(
          {
            status: "ACTIVE"
          },
          JSON.parse(userId).userId
        )

        this.tokenRepository.deleleteByPattern(`CMT_${confirmationToken}_`)
      } else {
        return new Error("Invalid confirmation link.")
      }
    } catch (error) {
      return error
    }
  }
}

export { AccountConfirmationUseCase }
