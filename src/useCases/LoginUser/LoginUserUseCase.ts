import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { compare } from "bcrypt"
import { AccessTokenProvider } from "@providers/token/generateAccessToken"
import { RefreshTokenProvider } from "@providers/token/generateRefreshToken"
import { ILoginUserDTO, ILoginUserResponse } from "./LoginUserDTO"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute(userAccessData: ILoginUserDTO): Promise<ILoginUserResponse> {
    const user = await this.userRepository.getUserByLoginOptions(
      userAccessData.login
    )

    if (!user) throw new Error("Wrong credentials.")

    const isPasswordValid = await compare(
      userAccessData.password,
      user.password
    )

    if (!isPasswordValid) throw new Error("Wrong credentials.")
    // if (user.status === "PENDING") throw new Error("Confirm your account.")

    const accessToken = AccessTokenProvider(user.id, user.staff)
    const refreshToken = RefreshTokenProvider(user.id, user.staff)

    this.tokenRepository.set({
      key: user.id,
      value: JSON.stringify({ token: refreshToken })
    })

    return {
      accessToken,
      refreshToken,
      firstLogin: user.firstLogin
    }
  }
}

export { LoginUserUseCase }
