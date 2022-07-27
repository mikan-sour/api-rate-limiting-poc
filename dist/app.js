import express from 'express';
import bodyParser from 'body-parser';
import { createUserController, marcoController, timeRightNowController } from './controller';
import { cacheHealthCheck } from './datastore/cache';
import { PORT } from './config';
import { postgresHealthCheck, postgresInit } from './datastore/postgres';
import { cacheCheckMiddleware, getRateLimitByTokenMiddleware } from './middleware';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', marcoController);
app.post("/user/create", createUserController);
app.use(getRateLimitByTokenMiddleware);
app.use(cacheCheckMiddleware);
app.get("/time-right-now", timeRightNowController);
const cacheWorks = await cacheHealthCheck();
if (!cacheWorks) {
    process.exit(1);
}
const postgresWorks = await postgresHealthCheck();
if (!postgresWorks) {
    process.exit(1);
}
const postgresInitResult = await postgresInit();
if (!postgresInitResult) {
    process.exit(1);
}
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
