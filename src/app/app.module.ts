import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { Account2Page } from '../pages/account2/account2';
import { SplashPage } from '../pages/splash/splash';

import { Account2PageModule } from '../pages/account2/account2.module';

import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { Home } from '../pages/home/home';
import { HomeModule } from '../pages/home/home.module';
import { Bookings } from '../pages/bookings/bookings';
import { BookingsModule } from '../pages/bookings/bookings.module';
import { TrainingDetailsPageModule } from '../pages/training-details/training-details.module';
import { TrainingDetailsPage } from '../pages/training-details/training-details';
import { BookingDetailsPageModule } from '../pages/booking-details/booking-details.module';
import { BookingDetailsPopoverPage } from '../pages/booking-details-popover/booking-details-popover';

import { Credit } from '../pages/credit/credit';
import { CreditModule } from '../pages/credit/credit.module';
import { Performance } from '../pages/performance/performance';
import { PerformanceModule } from '../pages/performance/performance.module';

import { WelcomePage } from '../pages/welcome/welcome';
import { WelcomePageModule } from '../pages/welcome/welcome.module';

import { TrialPage } from '../pages/trial/trial';
import { TrialPageModule } from '../pages/trial/trial.module';
import { NewBookingPageModule } from '../pages/new-booking/new-booking.module';
import { NewBookingPage } from '../pages/new-booking/new-booking';
import { StudioPageModule } from '../pages/studio/studio.module';
import { StudioPage } from '../pages/studio/studio';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { DatePicker } from '@ionic-native/date-picker';
import { BookingProvider } from '../providers/booking/booking';
import { LoginProvider } from '../providers/login/login';
import { VideoPlayer } from '@ionic-native/video-player';
import { ProfileProvider } from '../providers/profile/profile';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'e293608a'
  }, 
  'auth': {
    'google': {
      'webClientId': '50271623750-umehgd30lin9vi5mbm2uoh8ftqfor38b.apps.googleusercontent.com',
      'scope': []
    }
  }
};


//ionic cordova plugin add cordova-plugin-googleplus --save --variable REVERSED_CLIENT_ID="com.googleusercontent.apps.50271623750-u46cffg7sdgvi4bplh7rd5og7ilqgnhb"
//ionic cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=50271623750-6ljgq92msti9m5nlhbikvprturr4gin2.apps.googleusercontent.com
//LinkedIn Client Id: 81wvwodfp1wkp1
//Linked Secret: hvQ9qCTuotLXRFil

//903946963743-5plj9lsa51rtqbcja265ptmrd3529i4c.apps.googleusercontent.com
//secret: sEJB9PVjhQI53xALfBfrqVy1

//latest reverseCLient: com.googleusercontent.apps.50271623750-u46cffg7sdgvi4bplh7rd5og7ilqgnhb
/*
com.bunkerpalace.cordova.YoutubeVideoPlayer 1.0.5 "CordovaYoutubeVideoPlayer"
cordova-plugin-console 1.0.5 "Console"
cordova-plugin-crosswalk-webview 2.2.0 "Crosswalk WebView Engine"
cordova-plugin-device 1.1.4 "Device"
cordova-plugin-inappbrowser 1.4.0 "InAppBrowser"
cordova-plugin-splashscreen 4.0.3 "Splashscreen"
cordova-plugin-statusbar 2.2.1 "StatusBar"
cordova-plugin-whitelist 1.3.1 "Whitelist"
cordova-plugin-wkwebview-engine 1.1.4-dev "Cordova WKWebView Engine"
ionic-plugin-keyboard 2.2.1 "Keyboard"
*/



@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    BookingDetailsPopoverPage,
    SplashPage
  ],
  imports: [
    BrowserModule,
    BookingsModule,
    PerformanceModule,
    WelcomePageModule,
    CreditModule,
    Account2PageModule,
    HomeModule,
    TrialPageModule,
    TrainingDetailsPageModule,
    NewBookingPageModule,
    BookingDetailsPageModule,
    StudioPageModule,
    CloudModule.forRoot(cloudSettings),
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:name' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:name' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: Home, name: 'Home', segment: 'home' },
        { component: Bookings, name: 'Bookings', segment: 'booking' },
        { component: Performance, name: 'Performance', segment: 'performance' },
        { component: Credit, name: 'Credit', segment: 'credit' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: WelcomePage, name: 'WelcomePage', segment: 'welcome' },
        { component: TrainingDetailsPage, name: 'TrainingDetailsPage', segment: 'training-details' },
        { component: NewBookingPage, name: 'NewBookingPage', segment: 'new-booking-page' },
        { component: StudioPage, name: 'StudioPage', segment: 'studio' }

      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    Home,
    Bookings,
    Credit,
    Performance,
    WelcomePage,
    TrialPage,
    Account2Page,
    TrainingDetailsPage,
    BookingDetailsPopoverPage,
    StudioPage,
    SplashPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    YoutubeVideoPlayer,
    GooglePlus,
    DatePicker,
    BookingProvider,
    LoginProvider,
    VideoPlayer,
    ProfileProvider
  ]
})
export class AppModule { }
