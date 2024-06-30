import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";

export function makeFetchUserCheckInUseCase(): FetchCheckInsHistoryUseCase {

    const prismaRepository = new PrismaCheckInsRepository()
    const usecase = new FetchCheckInsHistoryUseCase(prismaRepository)

    return usecase
}