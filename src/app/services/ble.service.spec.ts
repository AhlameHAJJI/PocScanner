import { TestBed } from '@angular/core/testing';

import { BLEService } from './ble.service';

describe('BLEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BLEService = TestBed.get(BLEService);
    expect(service).toBeTruthy();
  });
});
