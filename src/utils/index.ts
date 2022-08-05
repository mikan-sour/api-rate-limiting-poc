import { Result } from "../models/result"
import { TimeUntilNextDTO } from "../models/timeUntilNext"

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export function format429(errMsg:string,timeUntiNext:number):Result<TimeUntilNextDTO>{
    return TimeUntilNextDTO.create(errMsg,timeUntiNext)
}