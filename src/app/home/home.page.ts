import { Component } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id_rol!:number
  constructor(private storage:NativeStorage) {
    this.storage.getItem('id_rol').then(id=>{
      this.id_rol = id;
    })
  }
}
