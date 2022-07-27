import { createUserController } from "../../useCases/createUser";
import { Router } from 'express';

const createUserRouter: Router = Router();

createUserRouter.post("/", (req, res) => createUserController.execute(req, res))

export { createUserRouter }