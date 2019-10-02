import { TestBed } from '@angular/core/testing';

import { NFCScannerService } from './nfcscanner.service';

describe('NFCScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NFCScannerService = TestBed.get(NFCScannerService);
    expect(service).toBeTruthy();
  });
});
