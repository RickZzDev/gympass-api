import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";
import { SearchGymUseCase } from "@/use-cases/gym/search_gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma_gym_repository";
import { SearchNearByGymUseCase } from "@/use-cases/gym/search_nearby_gyms";
import { CheckInUseCase } from "@/use-cases/check_in/check_in_usecase";

export function makeCheckInUseCase(): CheckInUseCase {

    const prismaRepository = new PrismaGymRepository()
    const checkInRepository = new PrismaCheckInsRepository()
    const usecase = new CheckInUseCase(checkInRepository, prismaRepository)

    return usecase
}