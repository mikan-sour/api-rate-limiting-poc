import { createClient } from 'redis';
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
export default client;
export const cacheHealthCheck = async () => {
    try {
        client.connect();
        await client.PING();
        console.log(`[redis]: Cache is running at https://localhost:6379`);
        client.quit();
        return true;
    }
    catch (e) {
        console.log("Can't get a PONG :(");
        console.error(e);
        return false;
    }
};
