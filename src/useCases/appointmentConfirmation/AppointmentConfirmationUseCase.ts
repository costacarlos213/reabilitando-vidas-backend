import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { ITokenRepository } from "@repositories/tokenRepository/ITokenRepository"

class AppointmentConfirmationUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(token: string): Promise<void> {
    const appointmentId = await this.tokenRepository.getByPattern(
      `APT_CMT_${token}`
    )

    if (appointmentId) {
      const id = JSON.parse(appointmentId).appointmentId

      await this.appointmentRepository.updateAppointment(
        { confirmed: true },
        parseInt(id)
      )

      this.tokenRepository.deleleteByPattern(`APT_CMT_${token}`)
    } else {
      throw new Error("Invalid confirmation token")
    }
  }
}

export { AppointmentConfirmationUseCase }
