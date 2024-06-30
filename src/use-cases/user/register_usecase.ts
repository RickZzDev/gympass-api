import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository"
import { UsersRepository } from "@/repositories/users_repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "../errors/user_already_exists"
import { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name, email, password,
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6)
        const userWithSameEmail = await this.usersRepository.finByEmail(email)
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name, email, password_hash
        })

        return {
            user
        }

    }
}

