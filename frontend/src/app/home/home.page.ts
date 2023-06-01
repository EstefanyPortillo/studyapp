import { Component, inject, OnInit } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import axios from 'axios';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private data = inject(DataService);

  usuarios: any = [];

  constructor() {

  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ngOnInit(): void { //al cargar pantalla
    this.getUsers();
  }

  getUsers() {
    //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RpZ28iOjEsIm5hbWUiOiJFc3RlZnkiLCJsYXN0X25hbWUiOiJQb3J0aWxsbyIsImVtYWlsIjoiYWVwYWVzdGVAZ21haWwuY29tIiwiYXZhdGFyIjpudWxsLCJpYXQiOjE2ODU1Nzc1NjF9.KLd7dfzmJDXf2kxm8BTj_ZFyafNpCr13uTFS9Iddgyc')

    axios.get("http://localhost:3000/users/list"
      , {

        headers: {
          'Authorization': localStorage.getItem("token")

        },
      })
      .then(result => {
        if (result.data.success == true) {
          this.usuarios = result.data.usuarios;
          console.log(this.usuarios);

        } else {
          console.log(result.data.error);
        }

      }).catch(error => {
        console.log(error.message);
      })
  }
}
