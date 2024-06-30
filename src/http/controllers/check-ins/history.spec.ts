import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";
import { createAndAuthUser } from "@/utils/tests";
import { title } from "process";

describe('Get CheckIn history (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to fetch check in history', async () => {

        const { token } = await createAndAuthUser(app, true)
        const gymResponse = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
            title: 'Gym',
            description: 'Awesome',
            phone: '119909092929',
            latitude: -27.2092052,
            longitude: -46.6401091,
        })

        const checkInResponse = await request(app.server).post(`/gyms/${gymResponse.body.id}/check-ins`).set('Authorization', `Bearer ${token}`).send({
            title: 'Gym',
            latitude: -27.2092052,
            longitude: -46.6401091,
        })


        const historyResponse = await request(app.server).get(`/check-ins/history`).query({
            page: 1
        }).set('Authorization', `Bearer ${token}`).send()
        expect(historyResponse.body.history.checkIns).toEqual(
            [
                expect.objectContaining({
                    gym_id: gymResponse.body.id
                })
            ]
        )
        expect(historyResponse.status).toEqual(200)
    })

})