import { IUserRepository } from "@repositories/userRepository/UserRepository"
import { ILoginUserDTO, ILoginUserResponse } from "./LoginUserDTO"
import { compare } from "bcrypt"
import { generateAccessToken } from "../../providers/generateAccessToken"
import { generateRefreshToken } from "../../providers/generateRefreshToken"

class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    userAccessData: ILoginUserDTO
  ): Promise<ILoginUserResponse | Error> {
    try {
      const user = await this.userRepository.getUserByLoginOptions(
        userAccessData.login
      )

      if (!user) throw new Error("Wrong credentials")

      const isPasswordValid = await compare(
        userAccessData.password,
        user.password
      )

      if (!isPasswordValid) throw new Error("Wrong credentials")

      const accessToken = generateAccessToken(user.id)
      const refreshToken = generateRefreshToken(user.id)

      return { accessToken, refreshToken }
    } catch (error) {
      return error
    }
  }
}

export { LoginUserUseCase }
