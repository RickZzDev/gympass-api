import fastify from "fastify";
import { z, ZodError } from 'zod'
import { userRoutes } from "./http/routes/routes";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymRoutes } from "./http/controllers/gyms/route";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(userRoutes)
app.register(gymRoutes)


app.setErrorHandler((error, _, reply) => {

    if (error instanceof ZodError) {
        reply.status(400).send({ message: "Validation error.", issues: error.format() })
    }

    if (env.NODE_ENV !== "production") {
        console.error(error)
    } else {
        ///TODO Here we should log to an external tool, like DataDog/Sentry/New relic
    }

    return reply.status(500).send({ message: "Internal server error" })
})