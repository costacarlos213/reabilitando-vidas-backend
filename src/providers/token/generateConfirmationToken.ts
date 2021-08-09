interface IConfirmationProviderResponse {
  confirmationLink: string
  confirmationToken: string
}

export function ConfirmationLinkProvider(): IConfirmationProviderResponse {
  const token = Math.floor(1000000000 + Math.random() * 9000000000).toString()
  const serverUrl = process.env.SERVER_URL

  const confirmationLink = `${serverUrl}/confirmation/${token}`

  return {
    confirmationLink,
    confirmationToken: token
  }
}
