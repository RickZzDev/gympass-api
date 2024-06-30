import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register_usecase'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { UserAlreadyExistsError } from '../errors/user_already_exists'
import { InvalidCredentialsError } from '../errors/invalid_credentials_error'
import { GetUserProfileUseCase } from './get_user_profile_usecase'
import { ResourceNotFoundError } from '../errors/resource_not_found'
import { GetUserMetricsUseCase } from './get_user_metrics_usecase'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { randomUUID } from 'crypto'

let repositry: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('GetUserMetricsUseCase', () => {

    beforeEach(() => {
        repositry = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(repositry)
    })


    it('Should be able to get user metrics', async () => {
        await repositry.create({
            gym_id: randomUUID(),
            user_id: '2',
            created_at: new Date(),
        })
        await repositry.create({
            gym_id: randomUUID(),
            user_id: '2',
            created_at: new Date(),
        })

        const { checkInsCount } = await sut.execute({
            userId: '2'
        })

        expect(checkInsCount).toBe(2)
    })


    it('Should be able to get user metrics when no one was made', async () => {

        const { checkInsCount } = await sut.execute({
            userId: '2'
        })

        expect(checkInsCount).toBe(0)
    })


})