import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";
import { GetUserMetricsUseCase } from "@/use-cases/user/get_user_metrics_usecase";

export function makeGetUserMetricsUseCase(): GetUserMetricsUseCase {

    const prismaRepository = new PrismaCheckInsRepository()
    const usecase = new GetUserMetricsUseCase(prismaRepository)

    return usecase
}