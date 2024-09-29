import { TestBed } from '@angular/core/testing';

import { ProfileEventsService } from './profile-events.service';

describe('ProfileEventsService', () => {
  let service: ProfileEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
