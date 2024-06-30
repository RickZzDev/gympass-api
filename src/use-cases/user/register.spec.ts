import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register_usecase'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma_users_repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositoy'
import { UserAlreadyExistsError } from '../errors/user_already_exists'


let repository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Regiser use case', () => {

    beforeEach(() => {
        repository = new InMemoryUsersRepository()
        registerUseCase = new RegisterUseCase(repository)
    })


    it('Should be able to register', async () => {
        const { user } = await registerUseCase.execute({
            email: 'john@deos3.com',
            name: 'John Doe',
            password: '1234565'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should has user password upon regitration', async () => {

        const { user } = await registerUseCase.execute({
            email: 'john@deos3.com',
            name: 'John Doe',
            password: '1234565'
        })

        const isPasswordHashed = await compare('1234565', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })


    it('Should not be able to register with same email', async () => {

        const email = 'jonh_doe@gmail.com'

        const { user } = await registerUseCase.execute({
            email: email,
            name: 'John Doe',
            password: '1234565'
        })


        await expect(() => registerUseCase.execute({
            email: email,
            name: 'John Doe',
            password: '1234565'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})