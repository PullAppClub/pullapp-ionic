import { TestBed } from '@angular/core/testing';

import { TabBarService } from './tab-bar.service';

describe('TabBarService', () => {
  let service: TabBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
