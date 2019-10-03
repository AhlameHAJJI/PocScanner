import { Injectable , NgZone } from "@angular/core";
import { BluetoothLE } from "@ionic-native/bluetooth-le/ngx";
import { BLE} from "@ionic-native/ble/ngx";
import { AlertController } from "@ionic/angular";

// Bluetooth UUIDs
const LIGHTBULB_SERVICE = 'ff10';
const SWITCH_CHARACTERISTIC = 'ff11';
const DIMMER_CHARACTERISTIC = 'ff12';
@Injectable({
  providedIn: "root"
})
export class BLEService {
  devices: any[] = [];
  peripheral: any = {};
  statusMessage: string;
  power: boolean;
  constructor(public bluetoothle: BluetoothLE, public alertCtrl: AlertController, public ble: BLE, public ngZone: NgZone ) {}
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
 
  bleScan(adress) {
    //this.presentAlert('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device,adress), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');

  }

  onDeviceDiscovered(device, adress) {
    
    this.ngZone.run(() => {
      // if(device.id== adress)
      this.devices.push(device);
     
    });
    //this.presentAlert('id ' + device.id);
   //this.presentAlert('Scanned device ' + JSON.stringify(device, null, 2));
   //this.presentAlert('devices taille' + this.devices.length);
  }
  scanError(error) {
    this.setStatus('Error ' + error);
    this.presentAlert(
      'Error scanning for Bluetooth low energy devices');
    
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  bleConnexion(adressMAC) {

     let response = this.ble.connect(adressMAC).subscribe(
        
        (peripheral)=>{ this.presentAlert("connected");this.onConnected(peripheral);
          //window.location.replace('/connexion');
        },
          ()=>{this.presentAlert("not connected")}
      );
      return JSON.stringify(response);
      
      // this.ble.disconnect(adressMAC);
    }
    onConnected(peripheral) {
      this.peripheral = peripheral;
      // this.ble.read(this.peripheral.id, LIGHTBULB_SERVICE, SWITCH_CHARACTERISTIC).then(
      //   buffer => {
      //     let data = new Uint8Array(buffer);
      //     this.ngZone.run(() => {
      //         this.power = data[0] !== 0;
      //     });
      //   }
      // )
    }
    onDeviceDisconnected() {
      this.presentAlert('The peripheral unexpectedly disconnectedAl');
    }
 


}
