import { createClient } from 'redis';
const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));
export default client;
export const cacheHealthCheck = async () => {
    try {
        client.connect();
        const pong = await client.PING();
        console.log(`If we PING, we must also ${pong}`);
        client.quit();
        return true;
    }
    catch (e) {
        console.log("Can only PING :(");
        console.error(e);
        return false;
    }
};
