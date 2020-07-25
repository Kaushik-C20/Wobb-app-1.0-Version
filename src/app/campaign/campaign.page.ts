import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CampserviceService } from '../services/campservice.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit,OnDestroy {

  campList:any[] = [];
  subs:Subscription;
  constructor(private campserv:CampserviceService,private router:Router) {}
  platform:string=this.campserv.platform;

  ngOnInit(){
    this.campList = [];
    this.getdetails();
  }

  getdetails(){
    this.subs=this.campserv.getDetails().subscribe((data)=>{
      // console.log('POST home-campaign',data);
      for(let i in data){
        this.campList.push(data[i]);
      }
      console.log(this.campList);
    },err=>{
      console.log('ERROR home-campaign',err);
    }
    );
  }

  store(i:number){
    this.campserv.store(this.campList[i]['id']);
  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
