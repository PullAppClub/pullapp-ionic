import { TestBed } from '@angular/core/testing';

import { authenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let guard: typeof authenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
