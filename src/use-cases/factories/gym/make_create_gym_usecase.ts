import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";
import { SearchGymUseCase } from "@/use-cases/gym/search_gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma_gym_repository";
import { SearchNearByGymUseCase } from "@/use-cases/gym/search_nearby_gyms";
import { RegisterGymUseCase } from "@/use-cases/gym/create_gym_usecase";

export function makeRegisterGymUseCase(): RegisterGymUseCase {

    const prismaRepository = new PrismaGymRepository()
    const usecase = new RegisterGymUseCase(prismaRepository)

    return usecase
}