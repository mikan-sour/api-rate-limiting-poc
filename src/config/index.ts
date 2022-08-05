import dotenv from 'dotenv';
import { ClientConfig } from 'pg';
dotenv.config();

// API
const ENV = process.env.APP_ENV ? process.env.APP_ENV : 'development';
const HOST = process.env.API_HOST ? process.env.API_HOST : 'localhost'
const RATE_LIMIT = process.env.REDIS_RATE_LIMIT ? parseInt(process.env.REDIS_RATE_LIMIT) : 1;
const TIME_LIMIT = process.env.REDIS_TIME_LIMIT ? parseInt(process.env.REDIS_TIME_LIMIT) : 2;
const PORT = process.env.API_PORT;

const API_CONFIG = {
    env:ENV,
    host:HOST,
    port:PORT,
    rateLimit:RATE_LIMIT,
    timeLimit:TIME_LIMIT,
}

// Redis
const REDIS_HOST = process.env.REDIS_HOST ? process.env.REDIS_HOST : "localhost";
const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
const REDIS_CONFIG = {host:REDIS_HOST,port:REDIS_PORT}

// DB
const DB_PORT = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT): 5432;
const DB_HOST = process.env.POSTGRES_HOST 
const DB_USER = process.env.POSTGRES_USER
const DB_PASSWORD = process.env.POSTGRES_PASSWORD
const DB_DATABASE = process.env.POSTGRES_DB
const DB_CONFIG:ClientConfig = {
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,
    host:DB_HOST,
    port:DB_PORT
}

export { API_CONFIG, DB_CONFIG, REDIS_CONFIG }
