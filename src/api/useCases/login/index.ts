import { LoginUserController } from '../../../controller/user/loginUserController';
import { userService } from '../../service/userService';

const loginUserController = new LoginUserController(userService);

export { loginUserController }