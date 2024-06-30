import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check_ins_repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { start } from "repl";

export class PrismaCheckInsRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.create({
            data
        })

        return checkIn
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

        return checkIn
    }


    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {

        return await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({
            where: {
                user_id: userId
            },
        })
        return count
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkIn
    }
    async save(data: CheckIn): Promise<CheckIn> {
        const checkIn = await prisma.checkIn.update({
            where: {
                id: data.id
            },
            data: data
        })

        return checkIn
    }


}