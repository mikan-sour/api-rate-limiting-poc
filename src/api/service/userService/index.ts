import { UserService } from '../../../service/user';
import { pgUserRepo } from '../../data/userRepo';

export const userService = new UserService(pgUserRepo);