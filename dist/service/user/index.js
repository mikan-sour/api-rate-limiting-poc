import { v4 as uuidv4 } from 'uuid';
import { createUserRepo, getRateLimitByTokenRepo } from '../../repo/user';
export const createUserService = async (user, password, rateLimit) => {
    try {
        const uuid = uuidv4();
        return await createUserRepo(user, password, uuid, rateLimit);
    }
    catch (error) {
        throw error;
    }
};
export const getRateLimitByTokenService = async (token) => {
    try {
        return await getRateLimitByTokenRepo(token);
    }
    catch (error) {
        throw error;
    }
};
