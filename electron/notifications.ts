export const RedisConnect = 'redis-connect';
export const RedisDisconnect = 'redis-disconnect';

export const RedisResponse = 'redis-response';

export enum RedisConnectStatus {
    Connecting,
    ConnectAuthenticate,
    ConnectSuccess,
    ConnectFailed
}
