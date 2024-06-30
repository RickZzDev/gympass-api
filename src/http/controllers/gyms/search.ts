import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { prisma } from "../../../lib/prisma";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "@/use-cases/errors/user_already_exists";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make_register_usecase";
import { makeRegisterGymUseCase } from "@/use-cases/factories/gym/make_create_gym_usecase";
import { makeSearchGymUsecase } from "@/use-cases/factories/gym/make_search_gyms_usecase";

export async function search(req: FastifyRequest, reply: FastifyReply) {

    const searchGyms = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)

    })

    const { q, page } = searchGyms.parse(req.query);
    const registerUseCase = makeSearchGymUsecase()
    const gyms = await registerUseCase.execute({ query: q, page })


    return reply.status(200).send({
        gyms
    })
}