export const ConfigReload = 'config-reload';

export const RedisConnectionAdded = 'redis-connection-added';
export const RedisConnectionRemoved = 'redis-connection-removed';

export const RedisConnect = 'redis-connect';
export const RedisDisconnect = 'redis-disconnect';
export const RedisResponse = 'redis-response';

export enum RedisConnectStatus {
    Connecting = 'Connecting',
    ConnectAuthenticate = 'Authenticate',
    ConnectSuccess = 'Success',
    ConnectFailed = 'Failed'
}
