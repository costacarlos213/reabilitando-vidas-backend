import { User } from "@entities/User/User"
import { Status } from "@prisma/client"

export type logedUser = {
  password: string
  firstLogin: boolean
  id: string
  status: Status
}

export interface IUserRepository {
  getUserByCPF(requestedCpf: string): Promise<User>
  save(user: User, firstLogin: boolean): Promise<void | string>
  getUserByLoginOptions(login: string): Promise<logedUser>
  updateStatus(status: Status, userId: string): Promise<void>
  deleteUser(id: string): Promise<void>
}
