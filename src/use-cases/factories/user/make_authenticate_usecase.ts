import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository";
import { AuthenticationUseCase } from "../../auth/authentication_usecase";

export function makeAuthenticateUseCase(): AuthenticationUseCase {

    const prismaRepository = new PrismaUsersRepository()
    const authUseCase = new AuthenticationUseCase(prismaRepository)

    return authUseCase
}