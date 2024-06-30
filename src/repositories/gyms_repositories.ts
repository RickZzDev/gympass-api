import { Gym, Prisma } from "@prisma/client"

export interface FindManyNearBy {
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(gymId: string): Promise<Gym | null>
    searchMany(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
    findManyNearBy(params: FindManyNearBy): Promise<Gym[]>
}