import { UsersRepository } from "@/repositories/users_repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { ExecSyncOptionsWithStringEncoding } from "child_process";
import { hash } from "crypto";
import { InvalidCredentialsError } from "../errors/invalid_credentials_error";


interface AuthenticationUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticationUseCaseResponse {
    user: User
}


export class AuthenticationUseCase {

    constructor(
        private usersRepository: UsersRepository
    ) { }


    async execute({ email, password }: AuthenticationUseCaseRequest): Promise<AuthenticationUseCaseResponse> {
        const user = await this.usersRepository.finByEmail(email)
        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPassworMatches = await compare(password, user.password_hash)

        if (!doesPassworMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }

}