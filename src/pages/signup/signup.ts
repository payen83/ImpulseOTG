import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { TabsPage } from '../tabs/tabs';
import { AccountPage } from '../account/account';

import { Auth, User, GoogleAuth } from '@ionic/cloud-angular';
import { LoginProvider } from '../../providers/login/login';
import { GooglePlus } from '@ionic-native/google-plus';


//ionic state restore
@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string, confirmPassword?: string} = {};
  submitted = false;
  response: any;
  email: string;
  socialData: any;

  constructor(public googlePlus: GooglePlus, public alertCtrl: AlertController, public loginProvider: LoginProvider, public navCtrl: NavController, public userData: UserData, public auth: Auth, public user: User, public googleAuth: GoogleAuth) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {

      if(this.signup.confirmPassword === this.signup.password){

        this.loginProvider.doSignUp(this.signup.username, this.signup.password).then(res => {

          this.response = res;
          
          //console.log(this.response);

          if(!this.response.error){
            this.displayAlert('Signup Successful', 'Your account has been created. Please proceed to login.');
            //this.gotoTabsPage(this.signup.username);
          } else {
            this.displayAlert('Signup Failed', this.response.message);
          }
          
        })

      } else {
        this.displayAlert('Signup Error', 'Your password and confirm password do not match');
      }

    }
  }

  displayAlert(title: string, message: string){

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  facebookSignup(){
    this.auth.login('facebook').then( _ =>{

      this.socialData = this.user.social.facebook.data;
      
      if(this.socialData.email){
        this.email = this.socialData.email
      } else {
        this.email = this.socialData.raw_data.email;
      }

      this.socialSignup();

    }).catch(err =>{
      //alert('Facebook Login Initiated');
      alert(err);
        //this.gotoTabsPage('tempUser');
    });

  }

  googleSignup(){

    // this.googleAuth.login().then( _ =>{
    //   const username = this.user.social.google.data.username;
    //   alert(username);
    //  this.gotoTabsPage(username);
    // } ).catch(err =>{
    //   alert('Error: '+err);
    // });

    this.googlePlus.login({
      'webClientId': '50271623750-umehgd30lin9vi5mbm2uoh8ftqfor38b.apps.googleusercontent.com'})
      .then(res => {

        //alert(JSON.stringify(res));
        //this.displayName = res.displayName;
         this.email = res.email;
        // this.familyName = res.familyName;
        // this.givenName = res.givenName;
        // this.userId = res.userId;
        // this.imageUrl = res.imageUrl;

        // this.isLoggedIn = true;
        //alert('login');
        //console.log("logged")

        //this.gotoTabsPage(this.email);
        this.socialSignup();
      })
      .catch(err => alert(JSON.stringify('Error: ' + err)));

  }

  linkedInSignup(){
    this.auth.login('linkedin').then( _ =>{
      //alert(JSON.stringify(this.user.social.linkedin.data));
      this.socialData = this.user.social.linkedin.data;
      this.email = this.socialData.raw_data.emailAddress;
      this.socialSignup();
    } ).catch(err =>{
      alert('Error: '+JSON.stringify(err));
    });
  }

  gotoWelcomePage(userId: string){
    this.userData.signup(userId);
    this.navCtrl.pop();
  }

  gotoTabsPage(userId: string){
    this.userData.login(userId);
    this.navCtrl.push(TabsPage);
  }

  socialSignup(){
    this.loginProvider.doSignUp(this.email, this.email).then(res => {
      this.response = res;

      if (this.response.message == 'Email already exists'){
        this.loginProvider.doLogin(this.email, this.email).then(res => {
          this.gotoTabsPage(this.email); 
        });
      } else if(this.response.error){
        this.displayAlert('Error', 'Error with Login');
      } else {
        this.goToProfilePage(this.email);
      }
    });
  }

  goToProfilePage(userId: string){
    this.userData.login(userId);
    this.navCtrl.setRoot(AccountPage);
  }

}
