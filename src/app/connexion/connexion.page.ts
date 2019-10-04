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
  constructor(public bleService: BLEService,public activatedRoute: ActivatedRoute) { }
  adressMAC : string;

  ngOnInit() {
    this.adressMAC = this.activatedRoute.snapshot.paramMap.get('adressMac');
  }

  disconnect(){
   this.bleService.bleDisconnect(this.adressMAC);
   this.connected = false;
  }
  connect(){
    this.bleService.bleConnexion(this.adressMAC);
   }
}
