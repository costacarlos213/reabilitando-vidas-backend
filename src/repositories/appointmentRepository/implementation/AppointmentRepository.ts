import { Appointment } from "@entities/Appointment/Appointment"
import { prisma } from "../../../database/client"
import {
  dayAppointments,
  IAppointmentRepository
} from "../IAppointmentRepository"
import { IFilters } from "@useCases/indexAppointments/IndexAppointmentsDTO"

class AppointmentRepository implements IAppointmentRepository {
  async updateAppointment(
    field: Record<string, unknown>,
    appointmentId: number
  ): Promise<void> {
    await prisma.appointment.update({
      where: {
        id: appointmentId
      },
      data: field
    })
  }

  async indexAppointments(filters: IFilters): Promise<dayAppointments[]> {
    const appointments = await prisma.appointment.findMany({
      where: {
        id: { equals: parseInt(filters?.id) || undefined },
        user: {
          cpf: {
            equals: filters?.patientCpf
          }
        },
        AND: [
          { user: { name: { contains: filters?.patientName } } },
          {
            dateTime: {
              gte: filters?.initialDateTime,
              lte: `${filters?.finalDateTime}T23:59:59`
            }
          }
        ]
      },
      include: {
        user: {
          select: {
            name: true,
            cpf: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: {
        dateTime: "asc"
      }
    })

    return appointments
  }

  async getDayAppointments(
    initialDateTime: string,
    finalDateTime: string
  ): Promise<dayAppointments[]> {
    const databaseStoredAppointments = await prisma.appointment.findMany({
      where: {
        dateTime: {
          gte: initialDateTime,
          lt: finalDateTime
        }
      },
      include: {
        user: {
          select: {
            cpf: true,
            email: true,
            name: true,
            phone: true
          }
        }
      }
    })

    return databaseStoredAppointments
  }

  async save(appointment: Appointment): Promise<string> {
    const { User, Datetime } = appointment

    const appointmentAlreadyExists = await this.appointmentAlreadyExists(
      Datetime.value
    )

    if (appointmentAlreadyExists)
      throw new Error("There are 2 appointments at the same time")

    const dbAppointment = await prisma.appointment.create({
      data: {
        dateTime: Datetime.value,
        comments: appointment.Comments,
        appointmentType: appointment.AppointmentType,
        user: {
          connectOrCreate: {
            where: {
              cpf: User.cpf.value
            },
            create: {
              id: User.id,
              cpf: User.cpf.value,
              name: User.Name.value,
              password: User.Password,
              email: User.Email.value,
              phone: User.Phone.value,
              staff: User.Staff,
              firstLogin: true
            }
          }
        }
      }
    })

    return dbAppointment.id.toString()
  }

  private async appointmentAlreadyExists(dateTime: string): Promise<boolean> {
    const databaseStoredAppointment = await prisma.appointment.findFirst({
      where: {
        dateTime
      },
      include: {
        user: true
      }
    })

    if (!databaseStoredAppointment) {
      return false
    }

    return true
  }
}

export { AppointmentRepository }
