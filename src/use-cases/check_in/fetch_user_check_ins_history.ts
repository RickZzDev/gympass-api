import { CheckIn, User } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check_ins_repository";
import { GymsRepository } from "@/repositories/gyms_repositories";
import { getDistanceBetweenCondinates } from "@/utils/get_distance_between_cordinates";
import { ResourceNotFoundError } from "../errors/resource_not_found";
import { MaxDistanceError } from "./errors/max_distance_error";
import { MaxNumberOfCheckInsError } from "./errors/max_number_of_check_ins_error";


interface FetchCheckInsHistoryUseCaseRequest {
    userId: string,
    page: number
}

interface FetchCheckInsHistoryUseCaseResponse {
    checkIn: CheckIn
}


export class FetchCheckInsHistoryUseCase {

    constructor(
        private checkInsRepository: CheckInRepository,
    ) { }



    async execute({ userId, page }: FetchCheckInsHistoryUseCaseRequest) {
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)


        ///Calculate distance between user and gym
        return {
            checkIns
        }
    }

}