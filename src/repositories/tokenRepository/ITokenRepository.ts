export interface ISetValue {
  key: string
  value: string
  expiration?: number
}

export interface ITokenRepository {
  set(keyValue: ISetValue): Promise<void>
  get(key: string): Promise<string>
  deleleteByPattern(key: string): Promise<void>
  getByPattern(key: string): Promise<string>
  del(key: string): Promise<void>
}
