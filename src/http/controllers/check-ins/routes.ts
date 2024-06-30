
import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/middlewares/verify_jwt";
import { createCheckIn } from "./create";
import { validateCheckIn } from "./validate";
import { checkInHistory } from "./history";
import { checkInMetrics } from "./metrics";

export async function checkInRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.post('/gyms/:gymId/check-ins', createCheckIn)
    app.post('/check-ins/:checkInId/validate', validateCheckIn)
    app.get('/check-ins/history', checkInHistory)
    app.get('/check-ins/metrics', checkInMetrics)


}