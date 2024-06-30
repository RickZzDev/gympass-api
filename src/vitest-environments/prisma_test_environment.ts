import { randomUUID } from 'crypto';
import { Environment } from 'vitest';
import { execSync } from 'child_process';
import 'dotenv/config'
import { Prisma, PrismaClient } from '@prisma/client';

// "postgresql://docker:docker@localhost:5432/apigympass?schema=public"


function generateDatabaseUr(schemaName: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide DATBASE_URL enviroment variable')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schemaName)
    return url.toString()
}

const prisma = new PrismaClient()

export default <Environment>{
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const dataBaseUrl = generateDatabaseUr(schema)

        process.env.DATABASE_URL = dataBaseUrl
        //Não tem necessidade de validar o banco existente para rodar ou não as migrations, por isso vale usar o deploy que pula
        //esse check
        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,),
                    await prisma.$disconnect()
            },
        };
    }
}