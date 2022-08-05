import { Result } from "../result";

export class TimeUntilNextDTO {
    public timeUntilNext: number
    
    private constructor( timeUntilNext:number) {
        this.timeUntilNext = timeUntilNext;
    }

    public static create (errMsg: string, timeUntilNext: number ) {
        return Result.fail<TimeUntilNextDTO>(errMsg, new TimeUntilNextDTO(timeUntilNext));
    }
}