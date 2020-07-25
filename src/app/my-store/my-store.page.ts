import { Component, OnInit } from '@angular/core';
import { CampserviceService } from '../services/campservice.service';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {

  constructor(private campserv: CampserviceService) { }
  earn: number[] = this.campserv.sum;
  Money: number;

  ngOnInit() {
  }

}
