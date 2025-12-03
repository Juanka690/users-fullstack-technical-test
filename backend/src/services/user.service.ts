import { prisma } from "../config/prisma";
import { AppError } from "../errors/AppError";

export interface UserPayload {
    name?: string;
    email?: string;
    age?: number | null;
}

export const userService = {
    async list(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            prisma.user.findMany({
                skip,
                take: pageSize,
                orderBy: { id: "asc" }
            }),
            prisma.user.count()
        ]);

        return {
            data,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };
    },

    async getById(id: number) {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new AppError("Usuario no encontrado", 404);
        }

        return user;
    },

    async create(payload: UserPayload) {
        return prisma.user.create({
            data: {
                name: payload.name!,
                email: payload.email!,
                age: payload.age ?? null
            }
        });
    },

    async update(id: number, payload: UserPayload) {
        // Verificar que exista
        await this.getById(id);

        return prisma.user.update({
            where: { id },
            data: {
                ...(payload.name !== undefined && { name: payload.name }),
                ...(payload.email !== undefined && { email: payload.email }),
                ...(payload.age !== undefined && { age: payload.age })
            }
        });
    },

    async remove(id: number) {
        // Verificar que exista
        await this.getById(id);

        await prisma.user.delete({
            where: { id }
        });
    }
};
