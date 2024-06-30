import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthUser(app: FastifyInstance, isAdmin = false) {

    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: 'johndoe@gmail.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    const authReponse = await request(app.server).post('/sessions').send({
        email: 'johndoe@gmail.com',
        password: '123456'
    })

    const { token } = authReponse.body

    return { token }
}