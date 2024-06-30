import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";

describe('Profile (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able get profile', async () => {
        await request(app.server).post('/users').send({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const authReponse = await request(app.server).post('/sessions').send({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const { token } = authReponse.body

        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: "johndoe@gmail.com"
            })
        )
    })

})