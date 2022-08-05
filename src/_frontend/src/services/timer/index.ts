import { APIResult, TimeRightNow } from "../../types";
import { timer } from '../../store/timer';

export const getTimeRightNow = async(token:string):Promise<APIResult<TimeRightNow>> => {
    const signupRequest = await fetch(`/time-right-now?token=${token}`,{
        method:"GET",
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json'
        },
    });
    const result:APIResult<TimeRightNow> = await signupRequest.json();
    return result;
}