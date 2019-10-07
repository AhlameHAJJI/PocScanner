import { Component, OnInit } from '@angular/core';
import {BLEService} from '../services/ble.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  connected : boolean = true;
  disconnected: boolean = false;
  constructor(public bleService: BLEService,public activatedRoute: ActivatedRoute) { }
  adressMAC = null;

  ngOnInit() {
    this.adressMAC = this.activatedRoute.snapshot.paramMap.get('adressMAC');
  }

  disconnect(){
   this.bleService.bleDisconnect(this.adressMAC);
   this.connected = false;
   this.disconnected=true;
  }
  connect(){

    this.bleService.bleConnexion(this.adressMAC);
    this.connected = true;
    this.disconnected=false;
   }
}
