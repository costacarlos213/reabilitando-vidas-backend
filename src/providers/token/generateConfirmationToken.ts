export function ConfirmationLinkProvider(): string {
  const token = Math.floor(1000000000 + Math.random() * 9000000000).toString()

  return token
}
