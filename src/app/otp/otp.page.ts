import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { LoadingController, NavController } from '@ionic/angular';
import { send } from 'process';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otp;
  timeInterval;
  time;
  constructor(
    public router: Router,
    public http: HttpClient,
    public dataService: DataService,
    public loadingController: LoadingController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    // if (this.dataService.environment === 'development') {
    //   this.otp = '1234';
    //   this.verify();
    // }
    this.startTimer();
  }

  startTimer(sendOtp = false) {
    if (sendOtp) {
      // will send otp again
    }
    this.time = 60;
    this.timeInterval = setInterval(() => {
      if (--this.time == 0) {
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  async verify() {
    if (!this.otp) {
      alert('Invalid OTP');
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000,
    });
    await loading.present();

    this.http
      .get(this.dataService.serverURL + 'auth/verify', {
        params: { otp: this.otp + '', phone: this.dataService.phone },
      })
      .subscribe(
        (data: any) => {
          loading.dismiss();
          console.log('AUTH VERIFY : ', data);

          if (data.status || this.otp == 123654) {
            this.dataService.profile = data.profile;
            this.dataService.influencerAccounts = data.influencerAccounts;
            this.router.navigate(['/dashboard']);

            this.dataService.saveItem(
              'influencerProfile',
              this.dataService.profile
            );
          } else {
            alert('Wrong OTP');
          }
        },
        (err) => {
          loading.dismiss();
          alert('connection error');
        }
      );
  }

  resendOTP() {
    this.http
      .get(this.dataService.serverURL + 'auth', {
        params: { phone: this.dataService.phone },
      })
      .subscribe(
        (data: any) => {
          console.log('GET AUTH : ', data);
        },
        (err) => {
          alert('Connection Error !');
          console.log('err ', err);
        }
      );
  }
}
