import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Result } from "../../../models/result";
import { User } from "../../../models/user";
import { IUserService } from "../../../service/user";
import { getErrorMessage } from "../../../utils";
import { BaseController } from "../../base";


export class LoginUserController extends BaseController {
    
    private userService: IUserService;

    constructor (
        userService: IUserService
        ) {
        super();
        this.userService = userService;
    }

    protected async executeImpl(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<any> {
        try {
            const { username, password } = req.body;
            const userOrError: Result<User> = User.create(username, password, 0);
            if (userOrError.isFailure) {
                console.error("error here in userOrError")
                return this.clientError(res, userOrError.error);
            }

            const loginResultOrError =  await this.userService.login(username,password);
            if (loginResultOrError.isFailure) {
                console.log("error here in loginResultOrError")
                return this.clientError(res, userOrError.error);
            }

            return this.ok(res, loginResultOrError) 

        } catch (error) {
            return this.fail(res,getErrorMessage(error))
        }
    }
}

export default LoginUserController;