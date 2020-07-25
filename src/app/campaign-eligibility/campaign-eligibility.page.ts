import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CampserviceService } from '../services/campservice.service';

@Component({
  selector: 'app-campaign-eligibility',
  templateUrl: './campaign-eligibility.page.html',
  styleUrls: ['./campaign-eligibility.page.scss'],
})
export class CampaignEligibilityPage implements OnInit {

  constructor(public modalController: ModalController, private campserv: CampserviceService) { }

  curr_camp: any;
  Locations: any[];

  ngOnInit() {
    this.curr_camp = this.campserv.curr_camp;
    this.Locations = this.curr_camp['influencer_demografics']['locations'];
  }

  dismissModal() {
    this.campserv.dismissModal();
  }

}
