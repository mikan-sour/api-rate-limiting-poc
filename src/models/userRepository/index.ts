import { Result } from "../result"

export interface IUserRepo {
    createUser(user:string,password:string,token:string, rateLimit:number):Promise<Result<string>>
    login(user:string,password:string):Promise<Result<string>>
    getRateLimitByToken(token:string):Promise<Result<number>>
}