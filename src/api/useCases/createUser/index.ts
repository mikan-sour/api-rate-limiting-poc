import { CreateUserController } from '../../../controller/user/createUserController';
import { userService } from '../../service/userService';

const createUserController = new CreateUserController(userService);

export { createUserController }