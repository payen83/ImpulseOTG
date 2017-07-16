import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, AlertController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { AccountPage } from '../account/account';

import { Auth, User, GoogleAuth } from '@ionic/cloud-angular';
import { GooglePlus } from '@ionic-native/google-plus';

import { LoginProvider } from '../../providers/login/login';
import { ProfileProvider } from '../../providers/profile/profile';


/*
App ID: 1967402623479371
App Secret: 29f8945cf0194d228f99019fefba80c0
*/

@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  response: any;
  email: string;
  socialData: any;

  constructor(private profileProvider: ProfileProvider, public alertCtrl: AlertController, public loginProvider: LoginProvider, public navCtrl: NavController, public userData: UserData, public auth: Auth, public user: User, public googleAuth: GoogleAuth, public googlePlus: GooglePlus) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      
      this.loginProvider.doLogin(this.login.username, this.login.password).then(res => {

        this.response = res;

        let key = {token: this.response.key, user_id: this.response.user_id};
        
        //console.log('key: ' + key);

        if(!this.response.error){
          
          this.getUserProfile(key);
          this.loginProvider.saveToken(key);
          this.gotoTabsPage(this.login.username);
          
        } else {
          this.displayAlert('Login Error', 'Invalid username or password');
        }
        
      })

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

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  facebookLogin(){
    this.auth.login('facebook').then( _ =>{
      //this.email = this.user.social.facebook.data.email;
      //alert(JSON.stringify(this.user.social.facebook.data));
      this.socialData = this.user.social.facebook.data;
      if(this.socialData.email){
        this.email = this.socialData.email
      } else {
        this.email = this.socialData.raw_data.email;
      }

      this.socialLogin();
    }).catch(err =>{
      alert(JSON.stringify(err));
      //alert('Facebook Login Initiated');
      //this.gotoTabsPage('tempUser');
    });

  }

  googleLogin(){

    // this.googleAuth.login().then( _ =>{
    //   const username = this.user.social.google.data.email;
    //   this.gotoTabsPage(username);
    // }).catch(err=>{
    //   alert(JSON.stringify(err));
    //   alert('Google Plus Login Initiated');
    //   this.gotoTabsPage('tempUser');
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
        this.socialLogin();
      })
      .catch(err => alert(JSON.stringify('Error: ' + err)));

   }

  linkedInLogin(){
    this.auth.login('linkedin').then( _ =>{
      //alert(JSON.stringify(this.user.social.linkedin.data));

      this.socialData = this.user.social.linkedin.data;
      this.email = this.socialData.raw_data.emailAddress;
      this.socialLogin();
    } ).catch(err =>{
      alert(JSON.stringify(err));
    });
  }

  gotoTabsPage(userId: string){
    this.userData.login(userId);
    //this.navCtrl.setRoot(TabsPage);
    this.navCtrl.push(TabsPage);

  }

  goToProfilePage(userId: string){
    this.userData.login(userId);
    this.navCtrl.setRoot(AccountPage);
  }

  getUserProfile(key: any){

    this.loginProvider.userProfile(key.user_id, key.token).then(data=>{
      console.log(JSON.stringify(data));

      let response = data;

      this.profileProvider.saveProfile(response);

    })

  }

  socialLogin(){

    this.loginProvider.doLogin(this.email, this.email).then(res => {

          this.response = res;
          
          //console.log(this.response);
          // let user_id = this.response.id;
          // let key = this.response.key;

          let key = {user_id: this.response.id, token: this.response.key }

          if(!this.response.error){
           
           this.getUserProfile(key);

          } else if(this.response.message == 'No user'){
            //alert('user email: '+this.email);
            this.loginProvider.doSignUp(this.email, this.email).then(res => {

              this.response = res;

              if (this.response.message == 'Email already exists'){
                this.displayAlert('Login Error','Invalid login, please use another email.');
              } else {
                this.goToProfilePage(this.email);
              }
                 
            });
          }
          
    })

  }


}





