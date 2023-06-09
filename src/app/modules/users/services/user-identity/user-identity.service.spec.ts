import { TestBed } from '@angular/core/testing';

import { UserIdentityService } from './user-identity.service';

describe('UserIdentityService', () => {
  let service: UserIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
