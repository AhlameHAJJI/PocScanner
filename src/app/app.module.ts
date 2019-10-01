import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {QRScanner} from '@ionic-native/qr-scanner/ngx';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QRScanner,
    Dialogs,
    BluetoothLE,
    NFC,
    Ndef,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
