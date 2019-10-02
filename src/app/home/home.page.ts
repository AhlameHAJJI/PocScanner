import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BLE } from "@ionic-native/ble/ngx";
import {QRCodeScannerService} from "../services/qrcode-scanner.service";
import {NFCScannerService} from "../services/nfcscanner.service";
import {BLEService} from '../services/ble.service';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
 

  constructor(
    public platform: Platform,
    public qrCodeScannerService: QRCodeScannerService,
    public nfcScannerService: NFCScannerService,
    public bleService: BLEService,
  ) {
  
  }

}
