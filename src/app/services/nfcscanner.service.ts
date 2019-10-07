import { Injectable } from '@angular/core';
import { Platform, AlertController } from "@ionic/angular";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import {BLEService} from '../services/ble.service';
@Injectable({
  providedIn: 'root'
})
export class NFCScannerService {

  constructor(
    public nfc: NFC,
    public ndef: Ndef,
    private alertCtrl: AlertController,
    private bleService: BLEService) { }

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
  StartScanningNFC() {
    this.nfc
      .addNdefListener(
        () => {
          this.presentAlert("successfully attached ndef listener");
        },
        err => {
          this.presentAlert("error attached ndef listener" + err);
        }
      )
      .subscribe(event => {
        // this.presentAlert(
        //   "received ndef message. the tag contains: " + event.tag
        // );
        this.presentAlert(
          "decoded tag id : " + this.nfc.bytesToHexString(event.tag.id)
        );
        this.bleService.bleScan();
        this.bleService.bleConnexion(event.tag.id);
        let message = this.ndef.textRecord("test");
        this.nfc
          .share([message])
          .then(success => {
            this.presentAlert("Successfully written!");
          })
          .catch(error => {
            this.presentAlert("Writing failed. Please try again.");
          });
      });
  }
}
