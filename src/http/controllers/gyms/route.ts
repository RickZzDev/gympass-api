
import { FastifyInstance } from "fastify";
import { verifyJwt } from "@/middlewares/verify_jwt";
import { nearBy } from "./nearbyt";
import { create } from "./create";
import { search } from "./search";
import { verifyUserRole } from "@/middlewares/verify_user_role";


export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)

    app.get('/gym/nearby', nearBy)
    app.get('/gym/search', search)


    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)


}