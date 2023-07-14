import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileAuthGuard } from './profile-auth.guard';

describe('profileAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
