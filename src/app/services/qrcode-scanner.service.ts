import { Injectable } from '@angular/core';
import { Platform, AlertController } from "@ionic/angular";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import {BLEService} from '../services/ble.service';
@Injectable({
  providedIn: 'root'
})
export class QRCodeScannerService {
  qrScan: any;
  constructor(
    public qr: QRScanner,
    private alertCtrl: AlertController,
    public platform: Platform,
    public bleService: BLEService
  ) {
    //Now Disable scanning when back button is pressed
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    });
  }
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
  StartScanningQRCode() {

    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.qr.show();
        window.document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScan = this.qr.scan().subscribe(
          (textFound: string) => {
            window.document.getElementsByTagName("body")[0].style.opacity = "1";
            this.qr.hide();
            this.qrScan.unsubscribe();
            this.bleService.bleConnexion(textFound);
           // this.presentAlert(textFound);
            // this.bluetoothle.enable();
            // this.bluetoothle.connect({
            //   address: "" + textFound + "",
            //   autoConnect: true
            // });
          },
          err => {
            this.presentAlert(JSON.stringify(err));
          }
        );
      } else if (status.denied) {
      } else {
        this.presentAlert(JSON.stringify("err"));
      }
    });
  }


  


}
