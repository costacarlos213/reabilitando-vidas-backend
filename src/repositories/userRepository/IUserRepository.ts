import { IUser } from "../../entities/User/IUser"

export interface IUserRepository {
  findUser(email: string | null, phone: string | null)
  save(user: IUser)
}
