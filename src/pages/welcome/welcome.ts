import { Component } from '@angular/core';

//import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

import { UserData } from '../../providers/user-data';

//import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { TrialPage } from '../trial/trial';


/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData, private youtube: YoutubeVideoPlayer) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WelcomePage');
  }

  openVideo(){
  	this.youtube.openVideo('z5eerFwuCbo');
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  onLogin(){
  	this.navCtrl.push(LoginPage);
  }

  onTrial(){
  	    this.navCtrl.push(TrialPage);
  }

}
