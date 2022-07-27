import e from "express";
import { Result } from "../result";

export class User {
    
    public username:string;
    private _password: string;
    public rateLimit: number;

    private constructor(username: string, password: string, rateLimit:number) {
       this.username = username;
       this._password = password;
       this.rateLimit = rateLimit;
    }

    public static create (username: string, password: string, rateLimit:number){
        if(!password || password.length < 8) {
            return Result.fail<User>(`password length must be at least 8 chars`)
        }

        if(!username) {
            return Result.fail<User>('no username provided')
        }

        return Result.ok<User>( new User(username, password, rateLimit ? rateLimit : 3))
    }
}