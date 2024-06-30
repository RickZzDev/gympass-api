import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository";
import { RegisterUseCase } from "../../user/register_usecase";

export function makeRegisterUseCase(): RegisterUseCase {

    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}