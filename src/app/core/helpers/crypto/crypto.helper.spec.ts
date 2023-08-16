import { TestBed } from '@angular/core/testing';

import { CryptoHelper } from './crypto.helper';

describe('CryptoService', () => {
  let service: CryptoHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
