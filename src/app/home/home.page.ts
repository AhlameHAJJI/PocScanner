import { Component } from "@angular/core";
import { Dialogs } from "@ionic-native/dialogs/ngx";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";
import { Platform } from "@ionic/angular";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  qrScan: any;
 
  constructor(
    public platform: Platform,
    public dialog: Dialogs,
    public qr: QRScanner,
    public nfc: NFC,
    public ndef: Ndef,
    public bluetoothle: BluetoothLE
  ) {
    //Now Disable scanning when back button is pressed
    this.platform.backButton.subscribeWithPriority(0, () => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    });
  }

  StartScanning() {
    let initializeResult: object;
    let macAdress: object = {
      "address": "5A:94:4B:38:B3:FD",
      autoConnect: true,
    };
    let params: object = {
      "request": true,
      "statusReceiver": false,
     "restoreKey": "bluetoothleplugin"
    }
    
    this.qr.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        this.bluetoothle.initialize();
        this.qr.show();
        window.document.getElementsByTagName('body')[0].style.opacity = '0';
        this.qrScan = this.qr.scan().subscribe(
          (textFound: string) => {
           
            window.document.getElementsByTagName('body')[0].style.opacity = '1';
            this.qr.hide();
            this.qrScan.unsubscribe();
            this.dialog.alert(textFound);
            this.bluetoothle.enable();
            this.bluetoothle.connect( {
              "address": ""+textFound+"",
              autoConnect: true,
            });
           
          },
          err => {
            this.dialog.alert(JSON.stringify(err));
          }
        );
      } else if (status.denied) {
      } else {
        this.dialog.alert(JSON.stringify("err"));
      }
    });
   
  }


  // StartScanningNFC() {
  //   this.nfc
  //     .addNdefListener(
  //       () => {
  //         this.dialog.alert("nfclistener");
  //         //console.log('successfully attached ndef listener');
  //       },
  //       err => {
  //         console.log("error attaching ndef listener", err);
  //       }
  //     )
  //     .subscribe(event => {
  //       console.log("received ndef message. the tag contains: ", event.tag);
  //       console.log("decoded tag id", this.nfc.bytesToHexString(event.tag.id));

  //       let message = this.ndef.textRecord("Hello world");
  //       // this.nfc.share([message]).then(onSuccess).catch(onError);
  //     });
  // }
}
