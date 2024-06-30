import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository"
import { UsersRepository } from "@/repositories/users_repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user_already_exists"
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms_repositories"
import { userInfo } from "os"

interface SearchNearByGymUseCaseRequest {
    latitude: number,
    longitude: number
}

interface SearchNearByGymUseCaseResponse {
    gym: Gym[]
}

export class SearchNearByGymUseCase {

    constructor(private gymRepository: GymsRepository) { }

    async execute({
        latitude, longitude
    }: SearchNearByGymUseCaseRequest): Promise<SearchNearByGymUseCaseResponse> {


        const gym = await this.gymRepository.findManyNearBy({ latitude, longitude })

        return {
            gym
        }

    }
}

