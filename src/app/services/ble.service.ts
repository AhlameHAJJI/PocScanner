import { Injectable } from "@angular/core";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import { BLE} from "@ionic-native/ble/ngx";
import { AlertController } from "@ionic/angular";
@Injectable({
  providedIn: "root"
})
export class BLEService {
  constructor(public bluetoothle: BluetoothLE, public alertCtrl: AlertController, public ble: BLE) {}
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
  bleConnexion(adressMAC: any) {
    
      // new Promise((resolve) => {
      //   bluetoothle.initialize(resolve, { request: true, statusReceiver: false });
      // }).then(this.initializeSuccess, this.handleError);
       this.ble.connect(adressMAC);
    }
  //  initializeSuccess = (result) => {
  //   if (result.status === "enabled") {
  //     this.presentAlert("Bluetooth is enabled.");
  //     this.presentAlert(result);
  //   } else {

  //     this.presentAlert("Bluetooth is not enabled");
  //     this.presentAlert(result);
  //   }
  // }
  //  handleError = (error) => {

  //   let msg;

    // if (error.error && error.message) {
    //     let errorItems = [];
    //     if (error.service) {
    //         errorItems.push("service: " + (uuids[error.service] || error.service));
    //     }
    //     if (error.characteristic) {
    //         errorItems.push("characteristic: " + (uuids[error.characteristic] || error.characteristic));
    //     }
    //     msg = "Error on " + error.error + ": " + error.message + (errorItems.length && (" (" + errorItems.join(", ") + ")"));
    // }

    // else {

    //     msg = error;
    // }

    // log(msg, "error");

    // if (error.error === "read" && error.service && error.characteristic) {

    //     reportValue(error.service, error.characteristic, "Error: " + error.message);
    // }
  //}
  // bleConnexion(adressMAC: string) {
    
  //   // new Promise((resolve) => {
  //   //   bluetoothle.initialize(resolve, { request: true, statusReceiver: false });
  //   // }).then(this.initializeSuccess, this.handleError);
  //   this.ble.connect(adressMAC);
  // }
//   connect(address) {

//     log('Connecting to device: ' + address + "...", "status");

//     if (cordova.platformId === "windows") {

//         getDeviceServices(address);

//     }
//     else {

//         stopScan();

//         new Promise(function (resolve, reject) {

//             bluetoothle.connect(resolve, reject, { address: address });

//         }).then(connectSuccess, handleError);

//     }
// }

}
