import { CheckIn, User } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check_ins_repository";
import { GymsRepository } from "@/repositories/gyms_repositories";
import { getDistanceBetweenCondinates } from "@/utils/get_distance_between_cordinates";
import { ResourceNotFoundError } from "../errors/resource_not_found";


interface GetUserMetricsUseCaseRequest {
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}


export class GetUserMetricsUseCase {

    constructor(
        private checkInsRepository: CheckInRepository,
    ) { }



    async execute({ userId }: GetUserMetricsUseCaseRequest) {
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount
        }
    }

}