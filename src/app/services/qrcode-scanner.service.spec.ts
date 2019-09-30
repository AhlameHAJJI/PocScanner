import { TestBed } from '@angular/core/testing';

import { QRCodeScannerService } from './qrcode-scanner.service';

describe('QRCodeScannerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QRCodeScannerService = TestBed.get(QRCodeScannerService);
    expect(service).toBeTruthy();
  });
});
