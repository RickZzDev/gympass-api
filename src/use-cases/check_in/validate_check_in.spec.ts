import { expect, test, describe, it, beforeEach, vi, afterEach, beforeAll } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInUseCase } from './check_in_usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max_distance_error'
import { MaxNumberOfCheckInsError } from './errors/max_number_of_check_ins_error'
import { ValidateCheckInUseCase } from './validate_check_in'
import { ResourceNotFoundError } from '../errors/resource_not_found'

let repositry: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('ValidateCheckIn use case', () => {

    beforeEach(async () => {
        repositry = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(repositry)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('Should be able to validate the check in ', async () => {

        const createdCheckIn = await repositry.create({
            gym_id: "1",
            user_id: "1"
        })

        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(repositry.items[0].validated_at).toEqual(expect.any(Date))

    })


    it('Should not be able on inexistent the check in ', async () => {

        const createdCheckIn = await repositry.create({
            gym_id: "1",
            user_id: "1"
        })


        await expect(() => sut.execute({
            checkInId: "inexistentId"
        })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

    it('Should not be able to validate after 20 minutes of creation ', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40))



        const createdCheckIn = await repositry.create({
            gym_id: "1",
            user_id: "1"
        })

        const twentyOneMinutesInMiliseconds = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMiliseconds)



        await expect(() => sut.execute({
            checkInId: createdCheckIn.id
        })).rejects.toBeInstanceOf(Error)

    })
})