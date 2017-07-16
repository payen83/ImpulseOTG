import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { Account2Page } from '../account2/account2'
import { DatePicker } from '@ionic-native/date-picker';
import { LoginProvider } from '../../providers/login/login';
import { ProfileProvider } from '../../providers/profile/profile';


export interface Profile {
  name: string;
  gender: string;
  birth_date: string;
  phone: string;
  email: string;
  ic_number: string;
  address: string;
  emergency_name?: string;
  emergency_phone?: string;
  nutrtion_advice?: string;
  medical_history?: string;
  shirt_size?: string;
  weight?: string;
  height?: string;
}

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  phoneNo: string;
  icNo: string;
  dob: any;
  name: string;

  profile: Profile;

  constructor(public profileProvider: ProfileProvider, public loginProvider: LoginProvider, public alertCtrl: AlertController, public nav: NavController, public userData: UserData, private datePicker: DatePicker) {
    this.profile = {
        name: undefined,
        phone: undefined,
        birth_date: undefined,
        email: undefined,
        gender: undefined,
        ic_number: undefined,
        address: undefined,
        emergency_name: undefined,
        emergency_phone: undefined,
        nutrtion_advice: undefined,
        medical_history: undefined,
        shirt_size: undefined,
        weight: undefined,
        height: undefined
      };
  }

  ngAfterViewInit() {
    this.getUsername();

    
  }

  ionViewDidLoad(){
    this.profileProvider.loadUserProfile().then(data=>{
      //console.log(JSON.stringify(data));
      this.profile = {
        name: data.name,
        phone: data.phone,
        birth_date: data.birth_date,
        email: data.email,
        gender: data.gender,
        ic_number: data.ic_number,
        address: data.address
      };

      if(this.profile.birth_date == ' '){
        this.dob = undefined;
      } else{
        this.dob = new Date(parseInt(this.profile.birth_date)*1000);
      }      

    })
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  changeName() {
    let alert = this.alertCtrl.create({
      title: 'Change Name',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'name',
      value: this.name,
      placeholder: 'name'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
      }
    });

    alert.present();
  }

  changeAddress() {
    let alert = this.alertCtrl.create({
      title: 'Change Address',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'address',
      value: this.profile.address,
      placeholder: 'Address'
    });
    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
        this.profile.address = data.address;
        //this.userData.setUsername(data.address);
        //this.getUsername();
      }
    });

    alert.present();
  }

  changePhone(){

    let alert = this.alertCtrl.create({
      title: 'Change Phone Number',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'phone',
      value: this.profile.phone,
      placeholder: 'Phone No'
    });
    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
        this.profile.phone = data.phone;
        console.log('phoneNew: '+this.profile.phone)
      }
    });

    alert.present();

  }

  account2page(){
    this.nav.push(Account2Page);
  }

  changeIC(){

    let alert = this.alertCtrl.create({
      title: 'Change IC/Passport Number',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'icNo',
      value: this.profile.ic_number,
      placeholder: 'IC Number or Passport'
    });
    alert.addButton({
      text: 'OK',
      handler: (data: any) => {
        //this.userData.setUsername(data.username);
        //this.getUsername();
        this.profile.ic_number = data.icNo;
      }
    });

    alert.present();

  }

  changeDOB(){

  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  }).then(
    date => this.dob = date,
    err => console.log('Error occurred while getting date: ', err)
  );

  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    //console.log('Clicked to change password');

    let prompt = this.alertCtrl.create({
        title: 'Password',
        message: "Enter your new password",
        inputs: [
          {
            name: 'newPwd',
            placeholder: 'New Password',
            type: 'password'
          },
          {
            name: 'confirmPwd',
            placeholder: 'Confirm New Password',
            type: 'password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              //console.log('Saved clicked');
              if(data.newPwd != data.confirmPwd) {
                alert('New password not matched');
              } else {
                return;
              }
            }
          }
        ]
      });

      prompt.present();

  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  nil(){

  }

  saveProfile(){

  }


  support() {
    this.nav.push('SupportPage');
  }
}
