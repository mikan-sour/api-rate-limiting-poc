export type FormType = "login"|"signup";

export type APIResult<T> = {
    isSuccess:boolean,
    isFailure:boolean,
    error:string,
    _value:T
}

export type TimeRightNow = {
    remainingRequest:number,
    timeRightNow?:string,
    timeUntilNext?:string
}