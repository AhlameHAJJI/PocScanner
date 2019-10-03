import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { Platform , ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
//import { SplashPage } from './splash/splash.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true; // <-- show animation
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController
  ) {
    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then( async  () => {
  //     this.statusBar.styleDefault();
  //     let splash = this.modalCtrl.create({component: SplashPage,
  //       componentProps:{splash: SplashPage}});
  //       (await splash).present();

  //     //this.splashScreen.hide();
  //   });
  // }
  

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image

      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    });
  }
}
