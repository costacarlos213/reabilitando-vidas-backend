export interface ICreateUserDTO {
  cpf: string
  name: string
  email?: string
  phone?: string
  staff?: boolean
  password?: string
}
