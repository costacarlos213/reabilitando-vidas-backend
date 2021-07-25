export interface ICreateUserDTO {
  CPF: string
  name: string
  email?: string
  phone?: string
  staff?: boolean
  password?: string
}
