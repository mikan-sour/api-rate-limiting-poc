import { Request, Response } from "express";
import { userService } from "../api/service/userService";
import { cacheService } from "../api/useCases/limitApi";
import { getErrorMessage } from "../utils";

export const getRateLimitByTokenMiddleware = async (req:Request, res:Response, next:()=>void) => {
    try {
        const token = req.query.token;
        const rateLimit = await userService.getRateLimitByToken(token as string); 
        if(rateLimit.isFailure) {
            throw new Error(rateLimit.error)
        }
        req.body.rateLimit = rateLimit.getValue();
        next();
    } catch (error) {
        const msg = getErrorMessage(error)
        res.status(500).send({msg});
    }
}
export const cacheCheckMiddleware = async (req:Request, res:Response, next:()=>void) => {
    const token = req.query["token"];
    const serviceResult = await cacheService.checkRateLimit(token as string, req.body.rateLimit);
    if(serviceResult.isSuccess) {
        req.body.remaining = serviceResult.getValue()[1];
        next()
    } else if(serviceResult.isFailure && serviceResult.error === "exceeded limit") {
        res.status(429).json(serviceResult);
    } else {
        res.status(500).json(serviceResult);
    }
}

