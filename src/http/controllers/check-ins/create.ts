import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { prisma } from "../../../lib/prisma";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "@/use-cases/errors/user_already_exists";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make_register_usecase";
import { makeRegisterGymUseCase } from "@/use-cases/factories/gym/make_create_gym_usecase";
import { makeCheckInUseCase } from "@/use-cases/factories/check_in/make_checkin_usecase";
import { afterEach, beforeEach } from "node:test";
import { vi } from 'vitest'

export async function createCheckIn(req: FastifyRequest, reply: FastifyReply) {

    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInBody = z.object({
        latitude: z.number().refine(value => { return Math.abs(value) <= 90 }),
        longitude: z.number().refine(value => { return Math.abs(value) <= 180 })

    })

    const { gymId } = createCheckInParamsSchema.parse(req.params);


    const { latitude, longitude } = createCheckInBody.parse(req.body);
    const registerUseCase = makeCheckInUseCase()
    const { checkIn } = await registerUseCase.execute({ gymId, userId: req.user.sub, userLatitude: latitude, userLongitude: longitude })


    return reply.status(201).send({
        checkIn
    })
}