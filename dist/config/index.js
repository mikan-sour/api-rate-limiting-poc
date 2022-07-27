import dotenv from 'dotenv';
dotenv.config();
const RATE_LIMIT = process.env.REDIS_RATE_LIMIT ? parseInt(process.env.REDIS_RATE_LIMIT) : 1;
const TIME_LIMIT = process.env.REDIS_TIME_LIMIT ? parseInt(process.env.REDIS_TIME_LIMIT) : 1;
const PORT = process.env.API_PORT;
// Redis
const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : "http://localhost";
const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
const REDIS_CONFIG = { host: REDIS_HOST, port: REDIS_PORT };
// DB
const DB_PORT = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432;
const DB_HOST = process.env.POSTGRES_HOST;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
const DB_DATABASE = process.env.POSTGRES_DB;
const DB_CONFIG = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT
};
export { PORT, RATE_LIMIT, TIME_LIMIT, DB_CONFIG, REDIS_CONFIG };
