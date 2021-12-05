import { User } from "@prisma/client"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"

class GetUserByCPFUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(cpf: string): Promise<User> {
    const user = await this.userRepository.getUniqueUser({
      cpf
    })

    return user
  }
}

export { GetUserByCPFUseCase }
