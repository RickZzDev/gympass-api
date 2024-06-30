import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";
import { SearchGymUseCase } from "@/use-cases/gym/search_gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma_gym_repository";

export function makeSearchGymUsecase(): SearchGymUseCase {

    const prismaRepository = new PrismaGymRepository()
    const usecase = new SearchGymUseCase(prismaRepository)

    return usecase
}