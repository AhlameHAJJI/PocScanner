import { Injectable , NgZone } from "@angular/core";
import { BLE} from "@ionic-native/ble/ngx";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class BLEService {
  devices: any[] = [];
  statusMessage: string;
  constructor(public alertCtrl: AlertController, public ble: BLE, public ngZone: NgZone, public router: Router ) {}

  // show an alert modal
  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }
 

  bleScan() {

    this.devices = [];

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');

  }

  onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      this.devices.push(device);
    });

  }
  scanError(error) {
    this.setStatus('Error ' + error);
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  bleConnexion(adressMAC) {

     this.ble.connect(adressMAC).subscribe(
        ()=> {
          this.router.navigateByUrl('connexion/'+adressMAC);
          // window.location.replace('connexion');
        },
        () =>  {this.presentAlert('Not connected')}
      );
      // this.ble.disconnect(adressMAC);
    }
    onConnected(adressMAC) {
      //this.presentAlert('connected to '+adressMAC);
     this.router.navigateByUrl('connexion/'+adressMAC);
       // window.location.replace('connexion');
    }
    onDeviceDisconnected() {
      this.presentAlert('The peripheral unexpectedly disconnectedAl');
    }
 
   bleDisconnect(adressMAC){
    this.ble.disconnect(adressMAC);
   }

}
