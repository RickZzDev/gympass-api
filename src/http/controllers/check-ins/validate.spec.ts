import { afterAll, beforeAll, expect, it, test } from "vitest";
import request from 'supertest'
import { app } from '@/app'

import { describe } from 'vitest'
import { serialize } from "v8";
import { createAndAuthUser } from "@/utils/tests";
import { title } from "process";
import { afterEach, beforeEach } from "node:test";
import { vi } from "vitest"

describe('Validate CheckIn (e2e)', () => {

    beforeEach(() => {
        vi.useFakeTimers()
    })


    afterEach(() => {
        vi.useRealTimers()
    })


    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to validate check in', async () => {

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

        const validateResponse = await request(app.server).post(`/check-ins/${checkInResponse.body.checkIn.id}/validate`).set('Authorization', `Bearer ${token}`).send()
        expect(validateResponse.status).toEqual(204)
    })

})