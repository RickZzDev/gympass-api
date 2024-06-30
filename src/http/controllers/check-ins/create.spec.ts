import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";
import { createAndAuthUser } from "@/utils/tests";

describe('Create CheckIn (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able create check in', async () => {

        const { token } = await createAndAuthUser(app, true)
        const gymResponse = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'Gym',
            description: 'Awesome',
            phone: '119909092929',
            latitude: -27.2092052,
            longitude: -46.6401091,
        })

        const checkInResponse = await request(app.server).post(`/gyms/${gymResponse.body.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
            latitude: -27.2092052,
            longitude: -46.6401091,
        })


        expect(gymResponse.status).toEqual(
            201
        )
    })

})