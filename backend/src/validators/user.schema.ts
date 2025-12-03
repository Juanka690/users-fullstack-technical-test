import { z } from "zod";

export const userCreateSchema = z.object({
    name: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(1, "El nombre no puede estar vacío")
        .max(100, "El nombre es demasiado largo"),
    email: z
        .string({ required_error: "El email es obligatorio" })
        .email("Debe ser un email válido")
        .max(150, "El email es demasiado largo"),
    age: z
        .number()
        .int("La edad debe ser un entero")
        .min(0, "La edad no puede ser negativa")
        .optional()
        .nullable()
});

export const userUpdateSchema = userCreateSchema.partial().refine(
    (data) => data.name || data.email || data.age !== undefined,
    {
        message: "Debe enviar al menos un campo para actualizar"
    }
);

export const paginationSchema = z.object({
    page: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1))
        .optional()
        .default("1"),
    pageSize: z
        .string()
        .transform((val) => parseInt(val, 10))
        .pipe(z.number().int().min(1).max(100))
        .optional()
        .default("10")
});
