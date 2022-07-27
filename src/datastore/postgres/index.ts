import pkg, { ClientConfig } from 'pg';
import { DB_CONFIG } from '../../config';
import { UserRepoPG } from '../../repo/user';
import { createUserTable, initUUID } from './initQueries';

const { Pool } = pkg;
const dbConfg:ClientConfig = DB_CONFIG;

const pool = new Pool(dbConfg);
// use for healtcheck or startup init
export default pool; 

export const postgresHealthCheck = async ():Promise<boolean> => {
    try {
       await pool.connect();
       console.log(`[postgres]: DB is running at https://${DB_CONFIG.host}:${DB_CONFIG.port}`);
       return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// should move this to docker init
export const postgresInit = async ():Promise<boolean> => {
    try {
        const client = await pool.connect();
        await client.query(initUUID);
        await client.query(createUserTable);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}