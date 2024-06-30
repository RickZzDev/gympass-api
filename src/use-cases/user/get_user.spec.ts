import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register_usecase'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { UserAlreadyExistsError } from '../errors/user_already_exists'
import { InvalidCredentialsError } from '../errors/invalid_credentials_error'
import { GetUserProfileUseCase } from './get_user_profile_usecase'
import { ResourceNotFoundError } from '../errors/resource_not_found'

let repositry: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Authentication use case', () => {

    beforeEach(() => {
        repositry = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(repositry)
    })


    it('Should be able to find user by id', async () => {
        const userCreated = await repositry.create({
            email: 'john@deos3.com',
            password_hash: await hash('1234565', 6),
            name: "Joh doe"
        })

        const { user } = await sut.execute({
            userId: userCreated.id
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('Should not be able to find user wrong id  email', async () => {
        expect(() => sut.execute({
            userId: 'non-existing-id'
        }),).rejects.toBeInstanceOf(ResourceNotFoundError)
    })





})