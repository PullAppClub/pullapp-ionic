import { TestBed } from '@angular/core/testing';

import { ChallengePaymentService } from './challenge-payment.service';

describe('ChallengePaymentService', () => {
  let service: ChallengePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
