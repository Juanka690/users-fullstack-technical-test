import express from "express";
import cors from "cors";
import { env } from "./config/env";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/errorHandler";

export const createApp = () => {
    const app = express();

    app.use(
        cors({
            origin: env.corsOrigin
        })
    );

    app.use(express.json());

    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok" });
    });

    app.use("/api/users", userRoutes);

    // 404
    app.use((req, res) => {
        res.status(404).json({ message: "Ruta no encontrada" });
    });

    // Manejo global de errores
    app.use(errorHandler);

    return app;
};
