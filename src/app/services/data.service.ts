import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
declare var swal;

@Injectable()
export class DataService {
  serverURL = 'https://node.wobb.in/';
  environment = 'production';
  phone;
  profile;
  influencerAccounts = [];
  loader;
  // environment = 'development';

  // id;
  constructor(public http: HttpClient, public loadingCtrl: LoadingController) {
    // this.environment = 'development';
    this.serverURL = 'http://192.168.0.158:8080/';
  }

  request(method, endpoint, data, headers = {}) {
    if (method === 'get') {
      return new Promise((resolve, reject) => {
        this.http.get(this.serverURL + endpoint, { params: data }).subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else if (method === 'post') {
      return new Promise((resolve, reject) => {
        this.http.get(this.serverURL + endpoint, { ...data }).subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  }

  saveItem(itemName, itemObject) {
    console.log(localStorage.setItem(itemName, JSON.stringify(itemObject)));
  }
  getItem(itemName): any {
    return JSON.parse(localStorage.getItem(itemName));
  }
  showSwal(title, type, body = '') {
    swal(title, body, type);
  }

  // async startLoader() {
  //   this.loader = await this.loadingCtrl.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Fetching Data...',
  //     // duration: 2000
  //   });

  //   await this.loader.present();
  // }
  // async stopLoader() {
  //   await this.loader.dismiss();
  // }
}
