import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findById(userId: string): Promise<User | null>
    finByEmail(email: string): Promise<User | null>
}