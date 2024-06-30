import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { makeFetchUserCheckInUseCase } from "@/use-cases/factories/user/make_fetch_user_check_in_usecase";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/user/make_get_user_metrics_usecase";

export async function checkInMetrics(req: FastifyRequest, reply: FastifyReply) {



    const registerUseCase = makeGetUserMetricsUseCase()
    const metrics = await registerUseCase.execute({
        userId: req.user.sub
    })

    return reply.status(200).send({
        metrics
    })
}