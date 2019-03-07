import { RedisServer } from './redis-server';

describe('RedisServer', () => {
  it('should create an instance', () => {
    expect(new RedisServer()).toBeTruthy();
  });
});
