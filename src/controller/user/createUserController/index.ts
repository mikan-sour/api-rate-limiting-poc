import {Request, Response} from 'express'
import { Result } from '../../../models/result';
import { User } from '../../../models/user';
import { IUserService } from '../../../service/user';
import { getErrorMessage } from '../../../utils';
import { BaseController } from '../../base'

export class CreateUserController extends BaseController {
    private userService: IUserService;

    constructor (
        userService: IUserService
        ) {
        super();
        this.userService = userService;
    }
    protected async executeImpl (req: Request, res: Response): Promise<void | any> {
      try {
        const { username, password, rateLimit } = req.body;
        const userOrError: Result<User> = User.create(username, password, rateLimit);
  
        if (userOrError.isFailure) {
          console.error("CreateUserController.userOrError err: ", userOrError.error)
          return this.clientError(res, userOrError.error);
        }

        const userResultOrError =  await this.userService.createUser(username,password,rateLimit);

        if (userResultOrError.isFailure) {
          console.error("CreateUserController.userResultOrError err: ", userOrError.error)
          return this.clientError(res, userResultOrError.error);
        }

        return this.ok(res, userResultOrError) 
  
      } catch (err) {
        return this.fail(res,getErrorMessage(err))
      }
    }
}