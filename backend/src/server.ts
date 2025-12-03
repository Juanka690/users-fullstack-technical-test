import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const app = createApp();

const start = async () => {
    try {
        await prisma.$connect();
        console.log("Conectado a la base de datos");

        app.listen(env.port, () => {
            console.log(`Backend escuchando en http://localhost:${env.port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor", error);
        process.exit(1);
    }
};

void start();
