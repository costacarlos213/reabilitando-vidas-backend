import { ILogoutDTO } from "./LogoutDTO"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class LogoutUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(userData: ILogoutDTO): Promise<void> {
    const { token, userId } = userData

    if (!token || !userId) throw new Error("Missing token or userId")

    this.tokenRepository.del(userId)

    this.tokenRepository.set("BL_" + userId, JSON.stringify({ token }))
  }
}

export { LogoutUseCase }
