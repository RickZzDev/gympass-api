import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'

describe('Authenticate (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to auth', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const response = await request(app.server).post('/sessions').send({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })


    it('Should return 401 when password is wrong', async () => {

        const response = await request(app.server).post('/sessions').send({
            email: 'johndoe@gmail.com',
            password: '1234567'
        })

        expect(response.statusCode).toEqual(400)
    })

    it('Should return 401 when user does not exists', async () => {

        const response = await request(app.server).post('/sessions').send({
            email: 'johndoe3@gmail.com',
            password: '1234567'
        })

        expect(response.statusCode).toEqual(400)
    })
})