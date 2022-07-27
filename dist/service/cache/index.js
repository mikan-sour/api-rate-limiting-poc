import { createClient } from "redis";
import { RATE_LIMIT, TIME_LIMIT } from "../../config";
import { getErrorMessage } from "../../utils";
export const setHash = async (client, user, limit) => {
    try {
        // await client.connect();
        const now = new Date;
        const setKey = await client.setEx(user, 60 * 60 * 24, now.toISOString());
        // await client.quit();
        return [setKey, limit];
    }
    catch (error) {
        console.error(error);
        return ["", 0];
    }
};
export const getHash = async (client, user) => {
    try {
        // await client.connect();
        const getVal = await client.get(user);
        // await client.quit();
        return getVal !== null ? getVal : "";
    }
    catch (error) {
        console.error(error);
        return "";
    }
};
export const shouldBeRemoved = (timestamp) => {
    const now = new Date;
    const timeInQuestion = new Date(timestamp);
    const timeLimitSeconds = TIME_LIMIT * 60;
    const seconds = (Math.abs(now.getTime() - timeInQuestion.getTime())) / 1000;
    return seconds > timeLimitSeconds;
};
export const addNewDate = async (client, user, prevString) => {
    try {
        const now = new Date().toISOString();
        const updated = prevString !== "" ? `${prevString} ${now}` : `${now}`;
        // await client.connect();
        const setKey = await client.setEx(user, 60 * 60 * 24, updated);
        // await client.quit();
        return [setKey, RATE_LIMIT - updated.split(" ").length + 1];
    }
    catch (error) {
        console.error(error);
        return ["", 0];
    }
};
export const handleService = async (user, limit) => {
    try {
        const client = createClient();
        await client.connect()
        const userCache = await getHash(client, user);
        if (!userCache) {
            const [setCache, remaining] = await setHash(client, user, limit);
            if (!setCache)
                throw new Error("setHash failed");
            return [setCache, remaining];
        }
        const arrayOfDates = userCache.split(" ");
        const filteredArr = arrayOfDates.map(date => {
            if (!shouldBeRemoved(date)) {
                return date;
            }
        }).filter(val => val != undefined);
        if (filteredArr.length >= limit) {
            return ["exceeded limit", 0];
        }
        const [set, remaining] = await addNewDate(client, user, filteredArr.join(" "));
        return [set, remaining];
    }
    catch (error) {
        const msg = getErrorMessage(error);
        return [msg, 0]; // 500 ?
    } finally {
        await client.quit();
    }
};
