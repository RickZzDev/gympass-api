import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";
import { createAndAuthUser } from "@/utils/tests";

describe('Search Gym (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to searhc a gym by title', async () => {

        const { token } = await createAndAuthUser(app, true)
        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'JS Gym',
            description: 'Awesome',
            phone: '119909092929',
            latitude: -27.2092052,
            longitude: -46.6401091,
        })
        await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'TS Gym',
            description: 'Awesome',
            phone: '119909092929',
            latitude: -27.2092052,
            longitude: -46.6401091,
        })

        const gymResponse = await request(app.server).get('/gym/search').set('Authorization', `Bearer ${token}`).query({
            q: "JS Gym"
        }).send()

        expect(gymResponse.body.gyms.gym).toHaveLength(1)
        expect(gymResponse.body.gyms.gym).toEqual([
            expect.objectContaining({
                title: "JS Gym"
            })
        ])
        expect(gymResponse.status).toEqual(
            200
        )
    })

})