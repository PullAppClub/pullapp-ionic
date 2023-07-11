import { TestBed } from '@angular/core/testing';

import { ChallengeLevelService } from './challenge-level.service';

describe('ChallengeLevelService', () => {
  let service: ChallengeLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
