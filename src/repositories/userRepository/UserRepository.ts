import { User } from "@entities/User/User"

export type logedUser = {
  password: string
  cpf: string
  id: string
}

export interface IUserRepository {
  getUserByCPF(requestedCpf: string): Promise<User>
  save(user: User): Promise<void>
  getUserByLoginOptions(login: string): Promise<logedUser>
}
