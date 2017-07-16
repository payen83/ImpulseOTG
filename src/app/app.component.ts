import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, ModalController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { Home } from '../pages/home/home';
import { Bookings } from '../pages/bookings/bookings';
import { Credit } from '../pages/credit/credit';
import { WelcomePage } from '../pages/welcome/welcome';
import { TrainingDetailsPage } from '../pages/training-details/training-details';
import { StudioPage } from '../pages/studio/studio';
import { SplashPage } from '../pages/splash/splash';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { ProfileProvider } from '../providers/profile/profile';



//import { SchedulePage } from '../pages/schedule/schedule';
//import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
//import { SupportPage } from '../pages/support/support';
//import { LoginPage } from '../pages/login/login';
//import { MapPage } from '../pages/map/map';
//import { Performance } from '../pages/performance/performance';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {

  name: string;
  credit: string = '500';
 
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  appPages: PageInterface[] = [
    { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: Home, index: 0, icon: 'home' },
    { title: 'My Bookings', name: 'TabsPage', component: TabsPage, tabComponent: Bookings, index: 1, icon: 'calendar' },
    { title: 'My Membership', name: 'TabsPage', component: TabsPage, tabComponent: Credit, index: 2, icon: 'card' }
  ];

   
  appPages3: PageInterface[] = [
    { title: 'Logout', name: 'WelcomePage', component: WelcomePage, icon: 'log-out', logsOut: true }
  ];

  appPages4: PageInterface[] = [
    { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: Home, index: 0, icon: 'home' }
  ];

   
  loggedInPages: PageInterface[] = [
    { title: 'My Profile', name: 'AccountPage', component: AccountPage, icon: 'person' }
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'WelcomePage', component: WelcomePage, icon: 'log-in' }
  ];

  infoPages: PageInterface[] = [
    { title: 'About Us', name: 'AboutPage', component: AboutPage, icon: 'information-circle' },
    { title: 'Studio Info', name: 'StudioPage', component: StudioPage, icon: 'navigate' },
    { title: 'Training Details', name: 'TrainingDetailsPage', component: TrainingDetailsPage, icon: 'people' }
  ];

  otherPages: PageInterface[] = [
    { title: 'Nutrition Advice', name: 'SignupPage', component: SignupPage, icon: 'nutrition' },
    { title: 'Fitness Calculators', name: 'SignupPage', component: SignupPage, icon: 'calculator' }
  ];

  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public modalCtrl: ModalController,
    public profileProvider: ProfileProvider
  ) {

    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        if (hasSeenTutorial) {
          this.rootPage = WelcomePage;
        } else {
          this.rootPage = WelcomePage;
        }
        this.platformReady()
    });

    //this.rootPage = WelcomePage;
    // load the conference data
    //confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      console.log('hasLoggedIn: ', hasLoggedIn);
      this.enableMenu(hasLoggedIn === true);
      if (hasLoggedIn){
        this.profileProvider.loadUserProfile().then( profile => {
          this.name = profile.name;
        })
        this.rootPage = TabsPage; 
        localStorage.setItem('hasLoggedIn', JSON.stringify(true));
      } 
      
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    // Set the root of the nav with params if it's a tab index
  } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', () => {
      localStorage.setItem('hasLoggedIn', JSON.stringify(true));
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      localStorage.setItem('hasLoggedIn', JSON.stringify(false));
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      let splash = this.modalCtrl.create(SplashPage);
      splash.present();
      //this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'danger';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'danger';
    }
    return;
  }
}

// appPages2: PageInterface[] = [
   //   { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: Home, index: 0, icon: 'home' }
   // ];

  // aboutPage: PageInterface[] = [
  //   { title: 'About Us', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  // ];

  // paymentPages: PageInterface[] = [
  //   { title: 'Buy Credit', name: 'LoginPage', component: LoginPage, icon: 'cart' },
  //   { title: 'Payment Info', name: 'SupportPage', component: SupportPage, icon: 'card' }
  // ];
