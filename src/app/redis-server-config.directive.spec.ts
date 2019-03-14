import { RedisServerConfigDirective } from './redis-server-config.directive';

describe('RedisServerConfigDirective', () => {
  it('should create an instance', () => {
    const directive = new RedisServerConfigDirective();
    expect(directive).toBeTruthy();
  });
});
