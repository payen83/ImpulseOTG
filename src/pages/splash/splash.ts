import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VideoPlayer } from '@ionic-native/video-player';


/**
 * Generated class for the SplashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

	displayVideo: string;

  constructor(public platform: Platform, public videoPlayer: VideoPlayer, public viewCtrl: ViewController, public splashScreen: SplashScreen, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SplashPage');
    this.splashScreen.hide();

    let options = {
        scalingMode: 1
    }

    let path: string;

    if(this.platform.is('android')){
    	path = 'file:///android_asset/www/assets/video/video.mp4';
    	this.videoPlayer.play(path, options).then(() => {
		 this.viewCtrl.dismiss();
		}).catch(err => {
		 
		 //alert(JSON.stringify(err));
		});
    	
    } else{
    	let height = window.innerHeight;
    	let width = window.innerWidth;
    	//console.log(height);
    	path = 'assets/video/video.mp4';
    	this.displayVideo = "<video height=" + height +" width=" + width +" controls autoplay><source src="+ path +  " type='video/mp4'></video>";
    }

    setTimeout(() => {
      this.viewCtrl.dismiss();
    }, 1000);
  }


}
