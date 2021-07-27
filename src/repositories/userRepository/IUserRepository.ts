import { User } from "@entities/User/User"

export interface IUserRepository {
  getUserByCPF(requestedCpf: string): Promise<User>
  save(user: User): Promise<void>
}
