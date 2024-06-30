import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { prisma } from "../../../lib/prisma";
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from "@/use-cases/errors/user_already_exists";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make_register_usecase";

export async function register(req: FastifyRequest, reply: FastifyReply) {

    const registerBody = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerBody.parse(req.body);
    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({ name, email, password })
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })

        }

        throw error
    }

    return reply.status(201).send()
}