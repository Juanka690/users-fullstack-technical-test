import dotenv from "dotenv";

dotenv.config();

const required = (value: string | undefined, name: string): string => {
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
};

export const env = {
    port: parseInt(process.env.PORT || "4000", 10),
    databaseUrl: required(process.env.DATABASE_URL, "DATABASE_URL"),
    corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173"
};
