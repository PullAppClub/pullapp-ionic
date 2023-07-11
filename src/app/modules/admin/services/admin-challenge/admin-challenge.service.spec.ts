import { TestBed } from '@angular/core/testing';

import { AdminChallengeService } from './admin-challenge.service';

describe('AdminChallengeService', () => {
  let service: AdminChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
