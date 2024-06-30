import { FastifyRequest, FastifyReply } from "fastify";
import { z } from 'zod'
import { makeValidateCheckInUsecase } from "@/use-cases/factories/check_in/make_validate_check_in_usecase";

export async function validateCheckIn(req: FastifyRequest, reply: FastifyReply) {

    const validateCheckInSchema = z.object({
        checkInId: z.string().uuid()
    })


    const { checkInId } = validateCheckInSchema.parse(req.params);


    const registerUseCase = makeValidateCheckInUsecase()
    await registerUseCase.execute({ checkInId })


    return reply.status(204).send()
}