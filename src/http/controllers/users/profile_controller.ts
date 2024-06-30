import { makeGetUserProfileUseCase } from "@/use-cases/factories/user/make_get_user_profile_usecase";
import { FastifyReply, FastifyRequest } from "fastify";



export async function profile(req: FastifyRequest, reply: FastifyReply) {

    await req.jwtVerify()

    const getUserProfile = makeGetUserProfileUseCase()

    const user = await getUserProfile.execute({ userId: req.user.sub })


    return reply.status(200).send({
        ...user,
    })
}