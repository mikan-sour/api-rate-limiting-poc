import pool from '../../../datastore/postgres';
import { UserRepoPG } from '../../../repo/user';

export const pgUserRepo = new UserRepoPG(pool);