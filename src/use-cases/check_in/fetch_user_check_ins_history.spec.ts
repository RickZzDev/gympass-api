import { expect, describe, it, beforeEach, } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { FetchCheckInsHistoryUseCase } from './fetch_user_check_ins_history'

let repositry: InMemoryCheckInRepository
let sut: FetchCheckInsHistoryUseCase

describe('CheckIn use case', () => {



    beforeEach(async () => {
        repositry = new InMemoryCheckInRepository()
        sut = new FetchCheckInsHistoryUseCase(repositry)
    })



    it('Should be able to fetch check in history ', async () => {

        await repositry.create({
            gym_id: '01',
            user_id: '2',
            created_at: new Date(),
        })

        await repositry.create({
            gym_id: '02',
            user_id: '2',
            created_at: new Date(),
        })
        const { checkIns } = await sut.execute({
            userId: '2',
            page: 1
        })
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([expect.objectContaining({ gym_id: '01' }), expect.objectContaining({ gym_id: '02' })])

    })


    it('Should be able to fetch check in history with pagination ', async () => {



        for (let i = 1; i <= 22; i++) {
            await repositry.create({
                gym_id: `${i}`,
                user_id: '2',
                created_at: new Date(),
            })

        }


        const { checkIns } = await sut.execute({
            userId: '2',
            page: 2
        })
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([expect.objectContaining({ gym_id: '21' }), expect.objectContaining({ gym_id: '22' })])

    })

})