import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { profile } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone;
  type = 'influencer';
  constructor(
    public router: Router,
    public dataService: DataService,
    public http: HttpClient,
    public loadingController: LoadingController
  ) {
    // this.dataService.saveItem('test', { profile: 1 });
    // alert(this.dataService.getItem('asdf'));
  }

  ngOnInit() {
    // CHECK IF THE USER IS ALREADY LOGGED IN

    if (this.dataService.getItem('influencerProfile')) {
      this.getProfileData(this.dataService.getItem('influencerProfile').id);
    }

    // this.dataService.profile = data.profile;
    //         this.dataService.influencerAccounts = data.influencerAccounts;
    //         this.router.navigate(['/dashboard']);
    // IMPLEMENT AUTO LOGIN FUNCITONALITY
    // if (this.dataService.environment === 'development') {
    //   this.phone = '8605650087';
    //   this.login();
    // }
  }

  async login() {
    if (!this.phone || (this.phone + '').length < 10) {
      alert('Enter Correct Phone Number !');
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading',
      // duration: 2000,
    });
    await loading.present();

    this.http
      .get(this.dataService.serverURL + 'auth', {
        params: { phone: this.phone },
      })
      .subscribe(
        (data: any) => {
          loading.dismiss();
          console.log('AUTH RESPONSE : ', data);
          console.log('then ', data);
          this.dataService.phone = this.phone;
          // this.dataService.id = data.id;
          // alert(this.dataService.id);
          this.router.navigate(['/otp']);
        },
        (err) => {
          loading.dismiss();
          alert('Connection Error !');
          console.log('err ', err);
        }
      );
  }

  async getProfileData(accountID) {
    // THIS FUNCTION IS SAME AS VERIFY IN OTP PAGE. THIS RETRIEVES ALL THE USER DATA TO HAVE LATEST PROFILE AND INFLUENCER ACCOUNTS LOCALLY
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000,
    });
    await loading.present();

    this.http
      .get(this.dataService.serverURL + 'auth/autoLogin', {
        params: { id: accountID },
      })
      .subscribe(
        (data: any) => {
          loading.dismiss();
          console.log('AUTO LOGIN : ', data);

          this.dataService.profile = data.profile;
          this.dataService.influencerAccounts = data.influencerAccounts;
          this.router.navigate(['/dashboard']);

          this.dataService.saveItem(
            'influencerProfile',
            this.dataService.profile
          );
        },
        (err) => {
          loading.dismiss();
          alert('connection error');
        }
      );
  }
}
