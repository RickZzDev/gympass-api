import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach, } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { SearchNearByGymUseCase } from './search_nearby_gyms'

let repositry: InMemoryGymsRepository
let sut: SearchNearByGymUseCase

describe('SearchGymNearBy use case', () => {



    beforeEach(async () => {
        repositry = new InMemoryGymsRepository()
        sut = new SearchNearByGymUseCase(repositry)
    })



    it('Should be able to fetch nearby gyms ', async () => {


        // latitude: new Decimal(-23.534380),
        // longitude: new Decimal(-46.890734),

        await repositry.create({
            title: "Near",
            description: "NEVER!",
            phone: "",
            latitude: new Decimal(-23.534380),
            longitude: new Decimal(-46.890734),
        })


        await repositry.create({
            title: "Far away",
            description: "NEVER!",
            phone: "",
            latitude: new Decimal(-23.437278),
            longitude: new Decimal(-46.860887),

        })

        const { gym } = await sut.execute({
            latitude: -23.534380,
            longitude: -46.890734
        })
        expect(gym).toHaveLength(1)
        expect(gym).toEqual([expect.objectContaining({ title: 'Near' })])

    })

})