import { TestBed } from '@angular/core/testing';

import { RedisService } from './redis.service';

describe('RedisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedisService = TestBed.get(RedisService);
    expect(service).toBeTruthy();
  });
});
