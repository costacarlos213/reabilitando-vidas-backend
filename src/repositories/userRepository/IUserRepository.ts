import { User } from "@entities/User/User"
import { User as PrismaUser } from "@prisma/client"
import { logedUser, UniqueUserKeys } from "./userRepo"

export interface IUserRepository {
  getUniqueUser(key: UniqueUserKeys): Promise<PrismaUser>
  save(user: User, firstLogin: boolean): Promise<void | string>
  getUserByLoginOptions(login: string): Promise<logedUser>
  updateUser(field: Record<string, unknown>, userId: string): Promise<void>
  deleteUser(id: string): Promise<void>
}
