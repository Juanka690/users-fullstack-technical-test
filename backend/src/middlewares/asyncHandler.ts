import { Request, Response, NextFunction } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void> | void;

export const asyncHandler =
    (handler: Handler) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(handler(req, res, next)).catch(next);
        };
