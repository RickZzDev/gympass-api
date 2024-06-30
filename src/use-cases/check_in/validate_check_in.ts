import { CheckIn, User } from "@prisma/client";
import { CheckInRepository } from "@/repositories/check_ins_repository";
import { GymsRepository } from "@/repositories/gyms_repositories";
import { getDistanceBetweenCondinates } from "@/utils/get_distance_between_cordinates";
import { ResourceNotFoundError } from "../errors/resource_not_found";
import { MaxDistanceError } from "./errors/max_distance_error";
import { MaxNumberOfCheckInsError } from "./errors/max_number_of_check_ins_error";
import dayjs from "dayjs";
import { time } from "console";
import { LateCheckInValidationError } from "./errors/late_check_in_validation_error";


interface ValidateCheckInUseCaseRequest {
    checkInId: string,
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}


export class ValidateCheckInUseCase {

    constructor(
        private checkInsRepository: CheckInRepository,
    ) { }

    private MAX_DISTANCE_IN_METERS = 100;


    async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }


        const timeFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes")

        if (timeFromCheckInCreation > 20) {
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }

}