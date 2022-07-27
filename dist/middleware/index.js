import { handleService } from "../service/cache";
import { getRateLimitByTokenService } from "../service/user";
import { getErrorMessage } from "../utils";
export const getRateLimitByTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.query.token;
        const rateLimit = await getRateLimitByTokenService(token);
        req.body.rateLimit = rateLimit;
        next();
    }
    catch (error) {
        const msg = getErrorMessage(error);
        res.status(500).send({ msg });
    }
};
export const cacheCheckMiddleware = async (req, res, next) => {
    const token = req.query["token"];
    const [msg, remaining] = await handleService(token, req.body.rateLimit);
    if (msg === "OK") {
        req.body.remaining = remaining;
        next();
    }
    else if (msg === "exceeded limit") {
        res.status(429).send({ msg, remaining });
    }
    else {
        res.status(500).send({ msg, remaining });
    }
};
