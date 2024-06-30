import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { makeFetchUserCheckInUseCase } from "@/use-cases/factories/user/make_fetch_user_check_in_usecase";

export async function checkInHistory(req: FastifyRequest, reply: FastifyReply) {

    const checkInHistory = z.object({
        page: z.coerce.number().min(1).default(1)

    })

    const { page } = checkInHistory.parse(req.query);
    const registerUseCase = makeFetchUserCheckInUseCase()
    const history = await registerUseCase.execute({
        userId: req.user.sub,
        page
    })


    return reply.status(200).send({
        history
    })
}