import { v4 as uuidv4 } from 'uuid';
import { Result } from '../../models/result';
import { IUserRepo } from '../../models/userRepository';

export interface IUserService {
    createUser(user:string,password:string, rateLimit:number):Promise<Result<string>>
    login(user:string,password:string):Promise<Result<string>>
    getRateLimitByToken(token:string):Promise<Result<number>>

}

export class UserService implements IUserService {
    
    constructor(userRepo:IUserRepo){
        this.userRepo = userRepo;
    }
   
    private userRepo: IUserRepo;

    createUser = async (user:string,password:string,rateLimit:number):Promise<Result<string>> => {
        try {
            const uuid = uuidv4();
            return await this.userRepo.createUser(user,password,uuidv4(),rateLimit)
        } catch (error) {
            throw error
        }
    }

    login = async (user: string, password: string): Promise<Result<string>> => {
        try {
            return await this.userRepo.login(user,password)
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    getRateLimitByToken = async (token:string):Promise<Result<number>> => {
        try {
            return await this.userRepo.getRateLimitByToken(token)
        } catch (error) {
            throw error
        }
    }
}