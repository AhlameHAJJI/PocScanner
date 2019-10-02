import { Component } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Platform, AlertController } from "@ionic/angular";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import {QRCodeScannerService} from "../services/qrcode-scanner.service";
import {NFCScannerService} from "../services/nfcscanner.service";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  //qrScan: any;

  constructor(
    public platform: Platform,
    public qrCodeScannerService: QRCodeScannerService,
    public nfcScannerService: NFCScannerService,
    public ndef: Ndef,
    public bluetoothle: BluetoothLE,
  ) {
    //Now Disable scanning when back button is pressed
    // this.platform.backButton.subscribeWithPriority(0, () => {
    //   document.getElementsByTagName("body")[0].style.opacity = "1";
    //   this.qrScan.unsubscribe();
    // });
  }

}
