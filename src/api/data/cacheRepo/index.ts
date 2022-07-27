import client from '../../../datastore/cache';
import { TCacheClient } from '../../../models/cacheClient';
import { CacheRepoRedis } from '../../../repo/cache';

export const redisCacheRepo = new CacheRepoRedis(client as TCacheClient);