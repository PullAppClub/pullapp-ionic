import { TestBed } from '@angular/core/testing';

import { ChallengeParticipationService } from './challenge-participation.service';

describe('ChallengeParticipationService', () => {
  let service: ChallengeParticipationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeParticipationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
