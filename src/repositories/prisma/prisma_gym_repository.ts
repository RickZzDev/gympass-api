import { Gym, Prisma } from "@prisma/client";
import { FindManyNearBy, GymsRepository } from "../gyms_repositories";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymsRepository {



    async findById(gymId: string): Promise<Gym | null> {
        return await prisma.gym.findUnique({
            where: {
                id: gymId
            }
        })
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            take: 20,
            skip: (page - 1) * 20
        })
    }

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        return await prisma.gym.create({ data })
    }

    async findManyNearBy({ latitude, longitude }: FindManyNearBy): Promise<Gym[]> {
        return await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `
    }

}