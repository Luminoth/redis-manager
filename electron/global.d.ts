import * as redis from 'redis';

import { Config } from './config';

declare global {
  namespace NodeJS {
    export interface Global {
      config: Config;
      redisConnections: Map<string, redis.RedisClient>;
    }
  }
}
