import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";
import { createAndAuthUser } from "@/utils/tests";
import { title } from "process";

describe('Get metrics  (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to fetch check in metrics', async () => {

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



        const metricsResponse = await request(app.server).get(`/check-ins/metrics`).set('Authorization', `Bearer ${token}`).send()
        expect(metricsResponse.body.metrics).toEqual(
            expect.objectContaining({
                checkInsCount: 1
            })
        )
        expect(metricsResponse.status).toEqual(200)
    })

})