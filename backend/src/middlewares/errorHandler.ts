import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    // Errores de aplicación controlados
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details
        });
    }

    // Errores de validación Zod
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Error de validación",
            errors: err.errors.map((e) => ({
                path: e.path,
                message: e.message
            }))
        });
    }

    // Errores conocidos de Prisma (ej: unique constraint, not found, etc.)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            return res.status(409).json({
                message: "Ya existe un registro con ese valor único",
                meta: err.meta
            });
        }

        if (err.code === "P2025") {
            return res.status(404).json({
                message: "Recurso no encontrado",
                meta: err.meta
            });
        }
    }

    // Fallback genérico
    return res.status(500).json({
        message: "Error interno del servidor"
    });
};
