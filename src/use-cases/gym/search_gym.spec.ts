import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, } from 'vitest'
import { SearchGymUseCase } from './search_gym'
import { Decimal } from '@prisma/client/runtime/library'

let repositry: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('SearchGym use case', () => {



    beforeEach(async () => {
        repositry = new InMemoryGymsRepository()
        sut = new SearchGymUseCase(repositry)
    })



    it('Should be able to fetch search for gyms ', async () => {

        await repositry.create({
            title: "Never Stop learning",
            description: "NEVER!",
            phone: "",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })


        await repositry.create({
            title: "AOT Academy",
            description: "NEVER!",
            phone: "",
            latitude: new Decimal(0),
            longitude: new Decimal(0),
        })

        const { gym } = await sut.execute({
            query: 'Never Stop learning',
            page: 1
        })
        expect(gym).toHaveLength(1)
        expect(gym).toEqual([expect.objectContaining({ title: 'Never Stop learning' })])

    })


    it('Should be able to fetch paginated gym search ', async () => {



        for (let i = 1; i <= 22; i++) {
            await repositry.create({
                title: `TS Gym ${i}`,
                description: "NEVER!",
                phone: "",
                latitude: new Decimal(0),
                longitude: new Decimal(0),
            })

        }


        const { gym } = await sut.execute({
            query: 'TS Gym',
            page: 2
        })
        expect(gym).toHaveLength(2)
        expect(gym).toEqual([expect.objectContaining({ title: 'TS Gym 21' }), expect.objectContaining({ title: 'TS Gym 22' })])

    })

})