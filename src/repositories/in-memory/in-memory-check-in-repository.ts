import { CheckIn, Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users_repository";
import { CheckInRepository } from "../check_ins_repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInRepository {




    public items: CheckIn[] = []



    async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')


        const checkInOnSameDate = this.items.find(checkIn => {
            const checkINDate = dayjs(checkIn.created_at)
            const isOnSameDate = checkINDate.isAfter(startOfTheDay) && checkINDate.isBefore(endOfTheDay)


            return checkIn.user_id === userId && isOnSameDate
        })

        if (!checkInOnSameDate) {
            return null
        }

        return checkInOnSameDate
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return this.items.filter((item) => item.user_id === userId).slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }

    async findById(checkInId: string): Promise<CheckIn | null> {
        const checkIn = this.items.find((item) => item.id === checkInId)

        if (!checkIn) {
            return null
        }

        return checkIn
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        const index = this.items.findIndex(item => item.id == checkIn.id)

        if (index >= 0) {
            this.items[index] = checkIn
        }

        return checkIn
    }



    async countByUserId(userId: string) {
        return this.items.filter((item) => item.user_id === userId).length
    }


}