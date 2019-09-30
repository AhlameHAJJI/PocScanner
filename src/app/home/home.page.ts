import { Component } from '@angular/core';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
qrScan: any ;
  constructor(public platform: Platform, public dialog: Dialogs, public qr: QRScanner) {}

  StartScanning() {
    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
         this.qr.show();
         document.getElementsByTagName("body")[0].style.opacity = "0";
         this.qr.scan().subscribe((textFound) => {

         },(err)=>{
           this.dialog.alert(JSON.stringify(err));
         })
      }
      else if (status.denied){

      }
      else {

      }
    })
  }

}
