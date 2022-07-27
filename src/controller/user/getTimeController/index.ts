import { BaseController } from "../../base";
import { Request, Response } from "express";
import { getErrorMessage } from "../../../utils";
import { TimeRightNowDTO } from "../../../models/timeRightNow";

export class GetTimeController extends BaseController {
    constructor(){
      super();
    }

    protected async executeImpl (req: Request, res: Response): Promise<void | any> {
        try {
          const currentTime = new Date().toISOString();
          const remainingRequests = req.body.remaining;

          return this.ok(res, TimeRightNowDTO.create(currentTime,remainingRequests)) 
    
        } catch (err) {
          return this.fail(res,getErrorMessage(err))
        }
      }
}