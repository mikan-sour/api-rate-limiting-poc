import { CacheService } from '../../../service/cache';
import { redisCacheRepo } from '../../data/cacheRepo';

export const cacheService = new CacheService(redisCacheRepo)