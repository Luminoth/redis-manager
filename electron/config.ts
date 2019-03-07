export class RedisServerConfig {
    name: string = '';
    host: string = '';
    port: number = 0;
}

export class Config {
    redisConfig: RedisServerConfig[] = [];
}
