import { expect, test, describe, it, beforeEach, vi, afterEach, beforeAll } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInUseCase } from './check_in_usecase'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max_distance_error'
import { MaxNumberOfCheckInsError } from './errors/max_number_of_check_ins_error'

let repositry: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn use case', () => {



    beforeEach(async () => {
        repositry = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        await gymsRepository.create({
            id: '1',
            description: "desc",
            latitude: (0),
            longitude: (0),
            phone: "",
            title: "Node Gym"

        })
        sut = new CheckInUseCase(repositry, gymsRepository)
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })


    it('Should be able to check in ', async () => {

        const { checkIn } = await sut.execute({
            gymId: '1',
            userId: '2',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in when distant from gym ', async () => {
        gymsRepository.gyms.push({
            id: '2',
            description: "desc",
            latitude: new Decimal(-23.534380),
            longitude: new Decimal(-46.890734),
            phone: "",
            title: " Node Gym"

        })

        await expect(() => sut.execute({
            gymId: '2',
            userId: '2',
            userLatitude: -23.481531,
            userLongitude: -46.853455
        })).rejects.toBeInstanceOf(MaxDistanceError)

    })



    it('Should not be able to check in in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: '1',
            userId: '2',
            userLatitude: 0,
            userLongitude: 0
        })

        await expect(() =>
            sut.execute({
                gymId: '1',
                userId: '2',
                userLatitude: 0,
                userLongitude: 0
            })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    })

    it('Should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            gymId: '1',
            userId: '2',
            userLatitude: 0,
            userLongitude: 0
        })
        vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))


        const { checkIn } = await sut.execute({
            gymId: '1',
            userId: '2',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))


    })

})