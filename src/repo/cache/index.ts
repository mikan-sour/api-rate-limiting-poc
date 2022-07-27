import { Result } from "../../models/result";
import { ICacheRepo } from '../../models/cacheRepository';
import { getErrorMessage } from "../../utils";
import { TCacheResponse } from "../../models/cacheResponse";
import { TCacheClient } from "../../models/cacheClient";

export class CacheRepoRedis implements ICacheRepo {

    client: TCacheClient;

    constructor(client:TCacheClient) {
        this.client = client
    }

    isOpen(): boolean {
        return this.client.isOpen
    }

    async closeClient(): Promise<void> {
        await this.client.quit()
    }

    async setHash(user: string, limit: number): Promise<Result<TCacheResponse>> {
        try {
            if(!this.isOpen()) {
                await this.client.connect()
            }
            const now = new Date
            const setKey = await this.client.setEx(user, 60 * 60 * 24, now.toISOString())
            return Result.ok([setKey, limit]);
        } catch (error) {
            console.error(error)
            return Result.fail(getErrorMessage(error))
        }
    }
    async getHash(user: string): Promise<Result<string>> {
        try {
            if(!this.isOpen()) {
                await this.client.connect()
            }
            const getVal = await this.client.get(user)
            return getVal !== null ? Result.ok(getVal) : Result.ok("");
        } catch (error) {
            console.error(error)
            return Result.fail(getErrorMessage(error));
        }
    }
    async addNewDate(user: string, prevString: string, rateLimit:number): Promise<Result<TCacheResponse>> {
        try {
            const now = new Date().toISOString()
            const updated = prevString !=="" ? `${prevString} ${now}` : `${now}`;
            if(!this.isOpen()) {
                await this.client.connect()
            }
            const setKey = await this.client.setEx(user, 60 * 60 * 24, updated)
            const res:TCacheResponse = [setKey, rateLimit - updated.split(" ").length + 1];
            return Result.ok(res);
        } catch (error) {
            console.error(error)
            return Result.fail(getErrorMessage(error))
        }
    }

}

