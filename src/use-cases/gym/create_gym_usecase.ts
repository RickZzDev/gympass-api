import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository"
import { UsersRepository } from "@/repositories/users_repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user_already_exists"
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/repositories/gyms_repositories"

interface RegisterGymUseCaseRequest {
    title: string
    description: string | null
    latitude: number
    longitude: number
    phone: string | null
}

interface RegisterGymUseCaseResponse {
    gym: Gym
}

export class RegisterGymUseCase {

    constructor(private gymRepository: GymsRepository) { }

    async execute({
        title, description, latitude, longitude, phone
    }: RegisterGymUseCaseRequest): Promise<RegisterGymUseCaseResponse> {


        const gym = await this.gymRepository.create({
            title, description, latitude, longitude, phone
        })

        return {
            gym
        }

    }
}

