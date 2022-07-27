import pool from "../../datastore/postgres";
import { createUserQuery, getRateLimitByToken } from "./queries";
export const createUserRepo = async (user, password, token, rateLimit) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res = await client.query(createUserQuery, [user, password, token, rateLimit]);
        await client.query('COMMIT');
        return res.rows[0].token;
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
export const getRateLimitByTokenRepo = async (token) => {
    const client = await pool.connect();
    try {
        const res = await client.query(getRateLimitByToken, [token]);
        return res.rows[0].rate_limit;
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
};
