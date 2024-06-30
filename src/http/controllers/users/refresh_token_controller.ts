import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { PrismaUsersRepository } from "@/repositories/prisma/prisma_users_repository";
import { AuthenticationUseCase } from "@/use-cases/auth/authentication_usecase";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid_credentials_error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/user/make_authenticate_usecase";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {

    //Validará o token no cookie
    await req.jwtVerify({ onlyCookie: true })

    const { role } = req.user
    const token = await reply.jwtSign({
        role
    }, {
        sign: {
            sub: req.user.sub
        }
    })

    const refreshToken = await reply.jwtSign({
        role
    }, {
        sign: {
            sub: req.user.sub,
            expiresIn: '7d'
        }
    })


    return reply.
        setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true, // HTTPS -> Front não consegue acessar
            sameSite: true,
            httpOnly: true

        })
        .status(200).send({
            token
        })


}