import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { prisma } from "../../../lib/prisma";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "@/use-cases/errors/user_already_exists";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make_register_usecase";
import { makeRegisterGymUseCase } from "@/use-cases/factories/gym/make_create_gym_usecase";

export async function create(req: FastifyRequest, reply: FastifyReply) {

    const createGymBody = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => { Math.abs(value) <= 90 }),
        longitude: z.number().refine(value => { Math.abs(value) <= 180 })

    })

    const { title, description, phone, latitude, longitude } = createGymBody.parse(req.body);
    const registerUseCase = makeRegisterGymUseCase()
    await registerUseCase.execute({ title, description, phone, latitude, longitude })


    return reply.status(201).send()
}