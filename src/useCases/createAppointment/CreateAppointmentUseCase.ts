import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import bcrypt from "bcrypt"

import { Appointment } from "@entities/Appointment/Appointment"
import { User } from "@entities/User/User"
import { ConfirmationLinkProvider } from "@providers/token/generateConfirmationToken"
import { IAppointmentRepository } from "@repositories/appointmentRepository/IAppointmentRepository"
import { IUserRepository } from "@repositories/userRepository/IUserRepository"
import { NonStaffUserError } from "@useCases/errors/NonStaffUserError"
import { ICreateAppointmentDTO } from "./CreateAppointmentDTO"

import { IConfirmationProvider } from "@providers/confirmation/IConfirmation"
import { generateAppointmentConfirmationEmail } from "../../utils/ConfirmAppointmentTemplateProvider"

dayjs.extend(utc)

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
        const hashPassword = await bcrypt.hash(patient.cpf, 8)

        const user = User.create({
          cpf: patient.cpf,
          email: patient.email,
          name: patient.name,
          phone: patient.phone,
          id: patient.id,
          password: hashPassword
        })

        const appointment = Appointment.create({
          user,
          appointmentType,
          comments,
          dateTime
        })

        const appointmentId = await this.appointmentRepository.save(appointment)

        if (patient.email) {
          const dateLessFiveDays = dayjs.utc(dateTime).subtract(5, "day")

          const difference = dayjs(dateLessFiveDays).diff(dayjs.utc())

          const confirmationToken = ConfirmationLinkProvider()

          const confirmationLink = `${process.env.SERVER_URL}/appointment/${confirmationToken}`

          const jobId = await this.confirmationProvider.execute({
            userId: user.id,
            jobName: "appointmentConfirmation",
            confirmationLink,
            confirmationToken,
            email: {
              subject: "Confirmação de consulta",
              html: generateAppointmentConfirmationEmail(confirmationLink),
              to: {
                name: user.Name.value,
                address: user.Email.value
              },
              delay: difference
            },
            token: {
              key: `APT_CMT_${confirmationToken}_${appointmentId}`,
              value: JSON.stringify({ appointmentId }),
              expiration: dayjs.utc(dateTime).diff(dayjs.utc(), "second")
            }
          })

          await this.appointmentRepository.updateAppointment(
            {
              taskId: jobId,
              confirmationCode: confirmationToken
            },
            parseInt(appointmentId)
          )
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
