import { generateAccessToken } from "src/providers/generateAccessToken"

class RefreshTokenUseCase {
  async execute(userId: string): Promise<string> {
    const token = await generateAccessToken(userId)

    return token
  }
}

export { RefreshTokenUseCase }
