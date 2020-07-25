import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CampserviceService } from '../services/campservice.service';

@Component({
  selector: 'app-campaign-deliverables',
  templateUrl: './campaign-deliverables.page.html',
  styleUrls: ['./campaign-deliverables.page.scss'],
})
export class CampaignDeliverablesPage implements OnInit {

  constructor(public modalController: ModalController, private campserv: CampserviceService) { }

  curr_camp: any;
  deliverables: any;
  keys: string[];
  keysnew: string[] = [];

  ngOnInit() {
    this.curr_camp = this.campserv.curr_camp;
    this.deliverables = this.curr_camp['detailed_demographic'];
    this.keys = Object.keys(this.deliverables);
    for (let i = 0; i < this.keys.length; i++) {
      this.keysnew.push(this.keys[i].split('_').join(' '));
    }
  }

  dismissPopover() {
    this.campserv.dismissPopover();
  }

}
