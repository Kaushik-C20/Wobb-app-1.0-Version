import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CampserviceService } from '../services/campservice.service';
import { CampaignDescriptionPage } from '../campaign-description/campaign-description.page';
import { CampaignDeliverablesPage } from '../campaign-deliverables/campaign-deliverables.page';
import { CampaignEligibilityPage } from '../campaign-eligibility/campaign-eligibility.page';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss']
})
export class CampaignDetailsPage implements OnInit {
  constructor(private campserv: CampserviceService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    private Route: ActivatedRoute) { }
  curr_camp: any;
  products: any;

  ngOnInit() {
    // this.id = this.campserv.id;
    this.curr_camp = this.campserv.curr_camp;
    this.products = this.curr_camp['products'];
  }

  async presentDescription() {
    this.campserv.currentModal = await this.modalController.create({
      component: CampaignDescriptionPage,
      // swipeToClose: true,
      mode: 'md'
    });
    return await this.campserv.currentModal.present();
  }

  async presentEligibility() {
    this.campserv.currentModal = await this.modalController.create({
      component: CampaignEligibilityPage,
      // swipeToClose: true,
      mode: 'md'
    });
    return await this.campserv.currentModal.present();
  }

  async presentDeliverables(ev: any) {
    this.campserv.currentPopover = await this.popoverController.create({
      component: CampaignDeliverablesPage,
      event: ev,
      translucent: false,
      mode: 'md',
      animated: true
    });
    return await this.campserv.currentPopover.present();
  }

  save() {
    let earn: number = this.curr_camp['influencer_earning'] ? this.curr_camp['influencer_earning'] : 1000;
    this.campserv.saveToearn(earn);
  }

}
