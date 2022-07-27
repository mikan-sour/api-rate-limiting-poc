import { TDatabaseConnection } from "../../models/dbClient";
import { Result } from "../../models/result";
import { IUserRepo } from "../../models/userRepository";
import { getErrorMessage } from "../../utils";
import { createUserQuery, getRateLimitByToken, loginQuery } from "./queries";

export class UserRepoPG implements IUserRepo {

    client:TDatabaseConnection;

    constructor(client:TDatabaseConnection){
        this.client = client;
    }

    public createUser = async(user:string, password:string, token:string, rateLimit:number):Promise<Result<string>> => {
        const client = await this.client.connect();
        try {
            await client.query('BEGIN')
            const res = await client.query(createUserQuery, [user,password,token,rateLimit])
            await client.query('COMMIT')
            return Result.ok(res.rows[0].token)
        } catch (error) {
            await client.query('ROLLBACK')
            return Result.fail(getErrorMessage(error))
        } finally {
            client.release()
        }
    }

    public login = async(username:string,password:string):Promise<Result<string>> => {
        const client = await this.client.connect();
        try {
            const res = await client.query(loginQuery, [username,password,])
            return Result.ok(res.rows[0].token)
        } catch (error) {
            return Result.fail(getErrorMessage(error))
        } finally {
            client.release()
        }
    }

    public getRateLimitByToken = async(token:string):Promise<Result<number>> => {
        const client = await this.client.connect();
        try {
            const res = await client.query(getRateLimitByToken, [token])
            return Result.ok<number>(res.rows[0].rate_limit);
        } catch (error) {
            return Result.fail(getErrorMessage(error))
        } finally {
            client.release()
        }
    }
}

