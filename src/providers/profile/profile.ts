import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';


/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileProvider {

baseURL: string ='http://impulse.aidansystem.com';

  constructor(public http: Http, private storage: Storage) {
    //console.log('Hello ProfileProvider Provider');
  }

  saveProfile(profile: any){
  	this.storage.set('Profile', JSON.stringify(profile))
  }

  loadUserProfile(): Promise<any>{

  	return new Promise(resolve => {

  		this.storage.get('Profile').then(data => {
  			resolve(JSON.parse(data));
  		});

  	});

  }

  saveProfileOnline(profile: any){

    this.storage.get('Token').then(data => {

    	let key = data.key;
    	let user_id = data.user_id

	    let headers = new Headers({ 
	      'Content-Type': 'application/x-www-form-urlencoded',
	      'Authorization': key
	     });

	    let options = new RequestOptions({ headers: headers });

	    let body = "name=" + profile.name;
	    	body += '&gender=' + profile.gender;
	    	body += '&birth_date=' + profile.birth_date;
	    	body += '&phone=' + profile.phone;	    	
	    	body += '&email=' + profile.email;
	    	body += '&ic_number=' + profile.ic_number;	    	
	    	body += '&address=' + profile.address;	    	
	    	body += '&emergency_name=' + profile.emergency_name;
	    	body += '&emergency_phone=' + profile.emergency_phone;
	    	body += '&nutrition_advice=' + profile.nutrition_advice;
	    	body += '&medical_history=' + profile.medical_history;
	    	body += '&shirt_size=' + profile.shirt_size;
	    	body += '&height=' + profile.height;
	    	body += '&weight=' + profile.weight;

	    let URL: string = this.baseURL + '/api/user/update_profile/' + user_id;
	    //alert('data');
	    return new Promise(resolve => {
	      
	      this.http.post(URL, body, options)
	      .map(res => res.json())
	      .subscribe(data => {
	         //console.log(res.json());
	         //alert(JSON.stringify(data));
	         resolve(data);
	       },(err)=>{ alert('Update error: ' + err); });

	    });

    });

  	
  }



}
