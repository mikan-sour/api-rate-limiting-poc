import { getCurrentTimeController } from "../../useCases/getCurrentTime";
import { Router } from 'express';

const getCurrentTimeRouter: Router = Router();

getCurrentTimeRouter.get("/", (req, res) => getCurrentTimeController.execute(req, res))

export { getCurrentTimeRouter }