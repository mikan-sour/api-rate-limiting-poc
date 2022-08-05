import { getErrorMessage } from "../../../../utils";
import { APIResult } from "../../types";

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
        const errMsg = getErrorMessage(error)
        console.error(errMsg);
        return errMsg
    }
}

export const loginService = async (username:string, password:string):Promise<string> => {
    try {
        const loginRequest = await fetch("/login",{
            method:"POST",
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({username,password})
        });

        const result:APIResult<string> = await loginRequest.json();

        if(result.isFailure) {
            throw new Error(result.error);
        }

        return result._value;

    } catch (error) {
        const errMsg = getErrorMessage(error)
        console.error(errMsg);
        return errMsg
    }
}