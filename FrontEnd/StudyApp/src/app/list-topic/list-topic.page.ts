import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, ToastController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-topic',
  templateUrl: 'list-topic.page.html',
  styleUrls: ['list-topic.page.scss'],
})
export class ListTopicPage implements OnInit {
  private data = inject(DataService);
  constructor(private toastController: ToastController,private router: Router) {}
  topics: any=[];
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
  ionViewWillEnter(): void {
    this.getTopics();
  }
  ngOnInit(): void {
    //this.getTopics();
   
  }
  getMessages(): Message[] {
    return this.data.getMessages();
  }
  eliminar(id: number){
    axios.delete('http://localhost:3000/topics/delete/'+ id, {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(async result=>{
      if(result.data.success){
  
        await this.presentToast('Topico Eliminado');
        this.getTopics();
      }else{
        await this.presentToast('Error '+ result.data.error);
        console.log( result.data.error);
       
      }
    
    }).catch(async error=>{
      await this.presentToast('Error '+ error.message);
      console.log(error.message);
    })
  }
  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration:1500,
      position: 'top'
    })
    await toast.present();
  }
  Home(){
   
    this.router.navigate(["/home"]);
  }
  getTopics(){
    axios.get('http://localhost:3000/topics/list', {
      headers: {
        'Authorization': localStorage.getItem("token")
      },
    }).then(result=>{
      if(result.data.success){
        this.topics=result.data.topics;
      }else{
        console.log( result.data.error);
      }
    
    }).catch(error=>{
      console.log(error.message);
    })
  }
}
