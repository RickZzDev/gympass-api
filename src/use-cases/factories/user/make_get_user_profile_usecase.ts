import { FetchCheckInsHistoryUseCase } from "@/use-cases/check_in/fetch_user_check_ins_history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma_check_in_repository";
import { GetUserMetricsUseCase } from "@/use-cases/user/get_user_metrics_usecase";
import { GetUserProfileUseCase } from "@/use-cases/user/get_user_profile_usecase";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository";

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {

    const prismaRepository = new PrismaUsersRepository()
    const usecase = new GetUserProfileUseCase(prismaRepository)

    return usecase
}