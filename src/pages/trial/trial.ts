import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, AlertController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';

import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-trial',
  templateUrl: 'trial.html'
})
export class TrialPage {
  signup: {name?: string, ic?: string, email?: string, phone?: string} = {};
  submitted = false;
  response: any;

  constructor(public loginProvider: LoginProvider, public alertCtrl: AlertController, public navCtrl: NavController, public userData: UserData) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      //this.userData.signup(this.signup.username);
      //this.navCtrl.push(TabsPage);
      if(this.validateEmail(this.signup.email)){

        //let newIc = this.signup.ic.replace('-','');

        this.loginProvider.doRegisterTrial(this.signup.name, this.signup.phone, this.signup.email, this.signup.ic).then(data => {
          this.response = data;
          if (!this.response.error) {
            this.displayAlert('Trial Registration', 'Your registration is successful');
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.displayAlert('Registration Failed', 'Please try again');
          }
        })

      } else {
        this.displayAlert('Registration Error', 'Your email address is invalid');
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

  validateEmail(email: string){
    if((email.split('@').length - 1) == 1){
      if((email.split('.').length - 1) > 0){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
