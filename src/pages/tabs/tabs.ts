import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

//import { AboutPage } from '../about/about';
import { Home } from '../home/home';
// import { MapPage } from '../map/map';
// import { SchedulePage } from '../schedule/schedule';
import { Bookings } from '../bookings/bookings';
import { Credit } from '../credit/credit';
import { Performance } from '../performance/performance';
import { UserData } from '../../providers/user-data';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = Home;
  tab2Root: any = Bookings;
  tab3Root: any = Credit;
  tab4Root: any = Performance;
  mySelectedIndex: number;
  enableTabs: boolean;

  constructor(navParams: NavParams, userData: UserData) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.enableTabs = JSON.parse(localStorage.getItem('hasLoggedIn'));
  }

}
