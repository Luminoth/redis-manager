export class RedisServerConfig {
  name = '';
  host = '';
  port = 0;
}

export class Config {
  redisConfig: RedisServerConfig[] = [];
}
