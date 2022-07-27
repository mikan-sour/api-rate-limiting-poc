import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { environmentVariablesController, marcoController } from './controller/other';
import { cacheHealthCheck } from './datastore/cache';
import { postgresHealthCheck, postgresInit } from './datastore/postgres';
import { cacheCheckMiddleware, getRateLimitByTokenMiddleware } from './middleware';
import { API_CONFIG } from './config';
import { createUserRouter } from './api/router/createUser';
import { getCurrentTimeRouter } from './api/router/getTime';
import { loginUserRouter } from './api/router/loginUser';

const app:Express = express();
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/marco', marcoController)
app.get('/env', environmentVariablesController)
app.use("/signup", createUserRouter)
app.use("/login", loginUserRouter)
app.use(getRateLimitByTokenMiddleware)
app.use(cacheCheckMiddleware)
app.use("/time-right-now", getCurrentTimeRouter )

const cacheWorks = await cacheHealthCheck();
if(!cacheWorks) {
    process.exit(1)
}

const postgresWorks = await postgresHealthCheck();
if(!postgresWorks){
    process.exit(1)
}

const postgresInitResult = await postgresInit();
if(!postgresInitResult){
    process.exit(1)
}

const { port, host } = API_CONFIG;

app.listen(port, () => {
    console.log(`[server]: Server is running at https://${host}:${port}`);
});

