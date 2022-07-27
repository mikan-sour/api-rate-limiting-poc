import { TCacheClient } from "../cacheClient"
import { TCacheResponse } from "../cacheResponse"
import { Result } from "../result"

export interface ICacheRepo {
    client:TCacheClient
    setHash(user:string, limit:number):Promise<Result<TCacheResponse>>
    getHash(user:string):Promise<Result<string>>
    addNewDate(user:string, prevString:string, rateLimit:number):Promise<Result<TCacheResponse>>
    isOpen():boolean
    closeClient():Promise<void>
}