import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '../user/register_usecase'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { UserAlreadyExistsError } from '../errors/user_already_exists'
import { AuthenticationUseCase } from './authentication_usecase'
import { InvalidCredentialsError } from '../errors/invalid_credentials_error'

let repositry: InMemoryUsersRepository
let sut: AuthenticationUseCase

describe('Authentication use case', () => {

    beforeEach(() => {
        repositry = new InMemoryUsersRepository()
        sut = new AuthenticationUseCase(repositry)
    })


    it('Should be able to authenticate', async () => {
        await repositry.create({
            email: 'john@deos3.com',
            password_hash: await hash('1234565', 6),
            name: "Joh doe"
        })

        const { user } = await sut.execute({
            email: 'john@deos3.com',
            password: '1234565'
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it('Should not be able to authenticate with wrong email', async () => {
        expect(() => sut.execute({
            email: 'john@asdasdasd.com',
            password: '1234565'
        }),).rejects.toBeInstanceOf(InvalidCredentialsError)
    })



    it('Should not be able to authenticate with wrong password', async () => {
        await repositry.create({
            email: 'john@deos3.com',
            password_hash: await hash('1234', 6),
            name: "Joh doe"
        })


        expect(() => sut.execute({
            email: 'john@asdasdasd.com',
            password: '1234565'
        }),).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})