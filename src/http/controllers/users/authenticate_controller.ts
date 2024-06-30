import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository";
import { AuthenticationUseCase } from "@/use-cases/auth/authentication_usecase";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid_credentials_error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/user/make_authenticate_usecase";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {

    const registerBody = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = registerBody.parse(req.body);
    try {
        const authUseCase = makeAuthenticateUseCase()
        const { user } = await authUseCase.execute({ email, password })

        const token = await reply.jwtSign({
        }, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send({
            token
        })

    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message })

        }

        throw error
    }

}