import { API_CONFIG } from "../../config";
import { ICacheRepo } from "../../models/cacheRepository";
import { TCacheResponse } from "../../models/cacheResponse";
import { Result } from "../../models/result";
import { getErrorMessage } from "../../utils";

const { timeLimit } = API_CONFIG

interface ICacheService {
    checkRateLimit:( user:string, limit:number) => Promise<Result<TCacheResponse>>
}

export class CacheService implements ICacheService {
    
    constructor(cacheRepo:ICacheRepo){
        this.cacheRepo = cacheRepo;
    }
   
    private cacheRepo: ICacheRepo;

    private shouldBeRemoved = (timestamp:string):boolean => {
        const now = new Date
        const timeInQuestion = new Date(timestamp);
        const timeLimitSeconds = timeLimit * 60;
        const seconds = (Math.abs(now.getTime() - timeInQuestion.getTime())) / 1000; 
        return seconds > timeLimitSeconds
    }

    checkRateLimit = async(user:string, limit:number):Promise<Result<TCacheResponse>> => {
        try {
            const userCache = await this.cacheRepo.getHash(user);
            if(!userCache.getValue()) {
                const setCacheResult = await this.cacheRepo.setHash(user, limit);
                if(setCacheResult.isFailure) throw new Error("setHash failed");
                return setCacheResult
            }
            const arrayOfDates = userCache.getValue().split(" ");
            const filteredArr = arrayOfDates.map(date => {
                if(!this.shouldBeRemoved(date)){
                    return date;
                }
            }).filter(val => val !=undefined);
            if(filteredArr.length >= limit) {
                // need next exp time
                let nextToExpireMil = 0;
                if(filteredArr[0]){
                    nextToExpireMil = Date.parse(filteredArr[0]);
                }
                const nextToExpire = new Date(nextToExpireMil);
                
                const timeUntilNext = new Date(nextToExpire).getTime() + (1000 * 60 * timeLimit);
                return Result.fail<TCacheResponse>("exceeded limit",["",timeUntilNext])

            }
            const addNewDateRes = await this.cacheRepo.addNewDate( user, filteredArr.join(" "), limit);
            if(addNewDateRes.isFailure) {
                throw new Error(addNewDateRes.error)
            }
            return addNewDateRes
    
        } catch (error) {
            const msg = getErrorMessage(error);
            return Result.fail(msg); 
        } finally {
            if(this.cacheRepo.isOpen()){
                await this.cacheRepo.closeClient()
            }
        }
    } 
}
