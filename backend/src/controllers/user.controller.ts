import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { paginationSchema, userCreateSchema, userUpdateSchema } from "../validators/user.schema";

export const userController = {
    list: async (req: Request, res: Response) => {
        const parsed = paginationSchema.parse({
            page: req.query.page ?? "1",
            pageSize: req.query.pageSize ?? "10"
        });

        const result = await userService.list(parsed.page, parsed.pageSize);
        res.json(result);
    },

    getById: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await userService.getById(id);
        res.json(user);
    },

    create: async (req: Request, res: Response) => {
        const data = userCreateSchema.parse(req.body);
        const newUser = await userService.create(data);
        res.status(201).json(newUser);
    },

    update: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const data = userUpdateSchema.parse(req.body);
        const updated = await userService.update(id, data);
        res.json(updated);
    },

    remove: async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await userService.remove(id);
        res.status(204).send();
    }
};
