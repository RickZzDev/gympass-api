import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users_repository";

export class InMemoryUsersRepository implements UsersRepository {


    public users: User[] = []

    async findById(userId: string): Promise<User | null> {
        const user = this.users.find((item) => item.id === userId)
        if (!user) {
            return null
        }

        return user
    }



    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user',
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.users.push(user)

        return user
    }
    async finByEmail(email: string): Promise<User | null> {
        const user = this.users.find((item) => item.email === email)
        if (!user) {
            return null
        }

        return user
    }


}