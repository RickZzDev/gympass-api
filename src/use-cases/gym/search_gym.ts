import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository"
import { UsersRepository } from "@/repositories/users_repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user_already_exists"
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms_repositories"

interface SearchGymUseCaseRequest {
    query: string,
    page: number
}

interface SearchGymUseCaseResponse {
    gym: Gym[]
}

export class SearchGymUseCase {

    constructor(private gymRepository: GymsRepository) { }

    async execute({
        query, page
    }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {


        const gym = await this.gymRepository.searchMany(query, page)

        return {
            gym
        }

    }
}

