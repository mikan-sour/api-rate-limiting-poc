import { RATE_LIMIT } from "../config";
import { createUserService } from "../service/user";
import { getErrorMessage } from "../utils";
export const marcoController = (_, res) => {
    res.send(`Polo`);
};
export const createUserController = async (req, res) => {
    try {
        const user = req.body.username;
        const pw = req.body.password;
        const token = await createUserService(user, pw, RATE_LIMIT);
        const remainingRequests = req.body.remaining;
        res.status(200).send({ token, remainingRequests });
    }
    catch (error) {
        const msg = getErrorMessage(error);
        res.status(500).send({ msg });
    }
};
export const timeRightNowController = (req, res) => {
    const currentTime = new Date().toISOString();
    const remainingRequests = req.body.remaining;
    res.status(200).send({ currentTime, remainingRequests });
};
