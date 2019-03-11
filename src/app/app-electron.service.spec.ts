import { TestBed } from '@angular/core/testing';

import { AppElectronService } from './app-electron.service';

describe('AppElectronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppElectronService = TestBed.get(AppElectronService);
    expect(service).toBeTruthy();
  });
});
