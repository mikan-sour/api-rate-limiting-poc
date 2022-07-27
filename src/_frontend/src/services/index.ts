import { getErrorMessage } from "../../../utils";
import { APIResult } from "../types";

export const signupService = async (username:string, password:string):Promise<string> => {
    try {
        const signupRequest = await fetch("/signup",{
            method:"POST",
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username,password, rateLimit:3})
        });

        const result:APIResult<string> = await signupRequest.json();

        if(result.isFailure) {
            throw new Error(result.error);
        }

        return result._value;

    } catch (error) {
        console.error(getErrorMessage(error));
        return ""
    }
}