import { loginUserController } from "../../useCases/login";
import { Router } from 'express';

const loginUserRouter: Router = Router();

loginUserRouter.post("/", (req, res) => loginUserController.execute(req, res))

export { loginUserRouter }