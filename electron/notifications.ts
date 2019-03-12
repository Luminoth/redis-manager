export const RedisConnect = 'redis-connect';
export const RedisDisconnect = 'redis-disconnect';

export const RedisResponse = 'redis-response';

export const RedisConfigUpdate = 'redis-config-update';
export const RedisConfigRemove = 'redis-config-remove';

export enum RedisConnectStatus {
    Connecting,
    ConnectAuthenticate,
    ConnectSuccess,
    ConnectFailed
}
