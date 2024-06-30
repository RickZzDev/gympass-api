import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { prisma } from "../../../lib/prisma";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "@/use-cases/errors/user_already_exists";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make_register_usecase";
import { makeRegisterGymUseCase } from "@/use-cases/factories/gym/make_create_gym_usecase";
import { makeSearchNearByGymUsecase } from "@/use-cases/factories/gym/make_fetch_nearby_gym_usecase";

export async function nearBy(req: FastifyRequest, reply: FastifyReply) {

    const nearByGymsQuerySchema = z.object({
        latitude: z.coerce.number()
            .refine((value) => { return Math.abs(value) <= 90 }),
        longitude: z.coerce.number()
            .refine(value => { return Math.abs(value) <= 180 })

    })

    const { latitude, longitude } = nearByGymsQuerySchema.parse(req.query);
    const registerUseCase = makeSearchNearByGymUsecase()
    const gyms = await registerUseCase.execute({ latitude, longitude })


    return reply.status(200).send({
        gyms
    })
}