export const createUserQuery = `INSERT INTO users(username,password,token,rate_limit) VALUES($1,$2,$3,$4) RETURNING token`;
export const getRateLimitByToken = `SELECT rate_limit FROM users WHERE token=$1`;
