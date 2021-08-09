export interface ITokenRepository {
  set(key: string, value: string, expiry?: boolean): Promise<void>
  get(key: string): Promise<string>
  del(key: string): Promise<void>
}
