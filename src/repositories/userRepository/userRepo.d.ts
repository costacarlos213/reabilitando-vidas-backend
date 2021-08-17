import { Status } from "@prisma/client"

export type logedUser = {
  name: string
  email: string
  password: string
  firstLogin: boolean
  id: string
  status: Status
}

type Cpf = {
  cpf: string
}

type UserId = {
  id: string
}

export type UniqueUserKeys = Cpf | UserId
