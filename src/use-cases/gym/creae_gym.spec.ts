import { expect, test, describe, it, beforeEach } from 'vitest'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { UserAlreadyExistsError } from '../errors/user_already_exists'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { RegisterGymUseCase } from './create_gym_usecase'
import { Decimal } from '@prisma/client/runtime/library'


let repository: InMemoryGymsRepository
let registerUseCase: RegisterGymUseCase

describe('Regiser use case', () => {

    beforeEach(() => {
        repository = new InMemoryGymsRepository()
        registerUseCase = new RegisterGymUseCase(repository)
    })


    it('Should be able to register', async () => {
        const { gym } = await registerUseCase.execute({
            description: null,
            latitude: (-23.534380),
            longitude: (-46.890734),
            phone: null,
            title: "Node Gym"
        })

        expect(gym.id).toEqual(expect.any(String))
    })


})