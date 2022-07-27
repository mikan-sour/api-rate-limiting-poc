import { Result } from "../result"

export class TimeRightNowDTO {
    public timeRightNow: string
    public remainingRequest: number

    private constructor(timeRightNow:string, remainingRequest:number) {
        this.timeRightNow = timeRightNow;
        this.remainingRequest = remainingRequest;
    }

    public static create (timeRightNow: string, remainingRequest:number) {
        return Result.ok<TimeRightNowDTO>( new TimeRightNowDTO(timeRightNow, remainingRequest));
    }

}