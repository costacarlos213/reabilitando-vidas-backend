export interface ILoginUserDTO {
  login: string
  password: string
}

export interface ILoginUserResponse {
  accessToken: string
  refreshToken: string
}
