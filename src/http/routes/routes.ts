
import { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register_controller";
import { authenticate } from "../controllers/users/authenticate_controller";
import { profile } from "../controllers/users/profile_controller";
import { verifyJwt } from "@/middlewares/verify_jwt";
import { refresh } from "../controllers/users/refresh_token_controller";
export async function userRoutes(app: FastifyInstance) {
    app.post("/users", register)
    app.post("/sessions", authenticate)
    app.patch('/token/refresh', refresh)

    // Authenticated routes
    app.get("/me", { onRequest: [verifyJwt] }, profile)
}