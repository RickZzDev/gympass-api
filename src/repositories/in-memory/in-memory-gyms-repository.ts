import { Gym, Prisma, } from "@prisma/client";
import { UsersRepository } from "../users_repository";
import { FindManyNearBy, GymsRepository } from "../gyms_repositories";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { getDistanceBetweenCondinates } from "@/utils/get_distance_between_cordinates";

export class InMemoryGymsRepository implements GymsRepository {





    public gyms: Gym[] = []

    async create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = {
            id: data.id ?? randomUUID(),
            description: data.description ?? null,
            title: data.title,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()

        }

        this.gyms.push(gym)

        return gym
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return this.gyms.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20)
    }

    async findById(gymId: string): Promise<Gym | null> {
        const user = this.gyms.find((item) => item.id === gymId)
        if (!user) {
            return null
        }
        return user
    }

    async findManyNearBy(params: FindManyNearBy) {
        return this.gyms.filter(item => {
            const distance = getDistanceBetweenCondinates({
                latitude: params.latitude,
                longitude: params.longitude
            }, { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() })

            return distance < 100
        })
    }


}