import { CheckIn, User } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check_ins_repository";
import { GymsRepository } from "@/repositories/gyms_repositories";
import { getDistanceBetweenCondinates } from "@/utils/get_distance_between_cordinates";
import { ResourceNotFoundError } from "../errors/resource_not_found";
import { MaxDistanceError } from "./errors/max_distance_error";
import { MaxNumberOfCheckInsError } from "./errors/max_number_of_check_ins_error";


interface CheckInUseCaseRequest {
    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}


export class CheckInUseCase {

    constructor(
        private checkInsRepository: CheckInRepository,
        private gymRepository: GymsRepository
    ) { }

    private MAX_DISTANCE_IN_METERS = 100;


    async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        ///Calculate distance between user and gym

        const distance = getDistanceBetweenCondinates({
            latitude: userLatitude, longitude: userLongitude
        }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })

        if (distance > this.MAX_DISTANCE_IN_METERS) {
            throw new MaxDistanceError()
        }

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError()
        }
        const checkIn = await this.checkInsRepository.create({ gym_id: gymId, user_id: userId, })
        return {
            checkIn
        }
    }

}