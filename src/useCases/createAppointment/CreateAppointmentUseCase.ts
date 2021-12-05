import { Appointment } from "@entities/Appointment/Appointment"
import { User } from "@entities/User/User"
import { ConfirmationLinkProvider } from "@providers/token/generateConfirmationToken"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { NonStaffUserError } from "@useCases/errors/NonStaffUserError"
import { ICreateAppointmentDTO } from "./CreateAppointmentDTO"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { IConfirmationProvider } from "@providers/confirmation/IConfirmation"

dayjs.extend(duration)

class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private userRepository: IUserRepository,
    private confirmationProvider: IConfirmationProvider
  ) {}

  async execute(appointmentData: ICreateAppointmentDTO): Promise<Error | void> {
    const { patient, dateTime, comments, appointmentType, userId } =
      appointmentData

    const staffUser = await this.userRepository.getUniqueUser({
      id: userId
    })

    if (staffUser.staff) {
      try {
        const user = User.create({
          cpf: patient.cpf,
          email: patient.email,
          name: patient.name,
          phone: patient.phone,
          id: patient.id,
          password: patient.cpf
        })

        const appointment = Appointment.create({
          user,
          appointmentType,
          comments,
          dateTime
        })

        const appointmentId = await this.appointmentRepository.save(appointment)

        if (patient.email) {
          const dateLessFiveDays = dayjs(dateTime).subtract(5, "day")

          const difference = dayjs(dateLessFiveDays).diff(dayjs())

          const confirmationToken = ConfirmationLinkProvider()

          const confirmationLink = `${process.env.SERVER_URL}/appointment/${confirmationToken}`

          this.confirmationProvider.execute({
            userId: user.id,
            jobName: "appointmentConfirmation",
            confirmationLink,
            confirmationToken,
            email: {
              subject: "Confirmação de consulta",
              text: `Para confimar sua consulta clique aqui: ${confirmationLink}`,
              to: {
                name: user.Name.value,
                address: user.Email.value
              },
              delay: difference
            },
            token: {
              key: `APT_CMT_${confirmationToken}_${appointmentId}`,
              value: JSON.stringify({ appointmentId }),
              expiration: dayjs.duration(dateTime).asSeconds()
            }
          })
        }

        return null
      } catch (err) {
        return err
      }
    } else {
      return new NonStaffUserError()
    }
  }
}

export { CreateAppointmentUseCase }
