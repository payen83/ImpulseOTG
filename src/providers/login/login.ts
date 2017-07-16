import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


@Injectable()
export class LoginProvider {

  constructor(public http: Http, public storage: Storage) {
    //console.log('Hello LoginProvider Provider');
  }

  doLogin(email: string, password: string): Promise<any>{
    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded',
      'withCredentials': true
     });

    let body = 'username=' + email + '&password=' + password;
    
    let options = new RequestOptions({ headers: headers });

    let URL: string = 'http://impulse.aidansystem.com/api/login';

    return new Promise(resolve => {
      
      this.http.post(URL, body, options)
        .map(res => res.json())
        .subscribe(data => {
      let response = {
        error: data.error,
        user_id: data.user_id,
        message: data.message,
        key: data.key
      };

      //console.log(response);
      resolve(response);

      },(err)=>{ alert('Login error: ' + err); });

    });
  }

  testAPI(): Promise<any>{

    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded'
     });

    //console.log(email+ ' ' +password);
    //let body = 'username=' + email + '&password=' + password;
    
    let options = new RequestOptions({ headers: headers });

    let URL: string = 'http://appsmalaya.com/webservices/output.php';

    return new Promise(resolve => {
      
      this.http.get(URL, options)
        .map(res => res.json())
        .subscribe(data => {
        console.log('data --> '+JSON.stringify(data));

      // let response = {
      //   error: data.error,
      //   user_id: data.id,
      //   message: data.message
      // };
      resolve(data);

      },(err)=>{ alert('Test error: ' + err); });

    });

  }

  doSignUp(email: string, password: string){
    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded'
     });

    //console.log(email+ ' ' +password);
    let body = 'username=' + email + '&password=' + password;
    
    let options = new RequestOptions({ headers: headers });

    let URL: string = 'http://impulse.aidansystem.com/api/user/signup';

    return new Promise(resolve => {
      
      this.http.post(URL, body, options)
        .map(res => res.json())
        .subscribe(data => {
        //console.log('data --> '+JSON.stringify(data));

      let response = {
        error: data.error,
        user_id: data.id,
        message: data.message
      };
      resolve(response);

      },(err)=>{ alert('Login error: ' + err); });

    });
  }

  doRegisterTrial(name: string, phone: string, email: string, ic: string){
    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded'
     });

    let body = 'email=' + email + '&name=' + name + '&phone=' + phone + '&ic_number=' + ic;
    console.log('body: '+ body);
    let options = new RequestOptions({ headers: headers });

    //let URL: string = 'http://impulse.aidansystem.com/api/imformtrial-booking';
    let URL: string = 'http://impulse.aidansystem.com/api/imformtrial-booking/register';

    return new Promise(resolve => {
      
      this.http.post(URL, body, options)
        .map(res => res.json())
        .subscribe(data => {

        let response = {
          error: data.error,
          id: data.id
        };

        resolve(response);

      },(err)=>{ alert('Register error: ' + err); });

    });
  }

  updatePassword(){
      
  }

  userProfile(user_id: string, key: string): Promise<any>{
    //console.log('calling api');
    let headers = new Headers({ 
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': key
     });

    let options = new RequestOptions({ headers: headers });

    let URL: string = 'http://impulse.aidansystem.com/api/user/'+user_id;
    //alert('data');
    return new Promise(resolve => {
      
      this.http.get(URL, options)
      .map(res => res.json())
      .subscribe(data => {
         //console.log(res.json());
         //alert(JSON.stringify(data));
         resolve(data);
       },(err)=>{ alert('Profile error: ' + err); });

    });

  }

  getUserProfile():Promise<any>{

    return new Promise(resolve => {

      this.storage.get('Profile').then(data => {

      if(data){
        let profile = {
          name: data.name,
          gender: data.gender,
          DOB: data.dob,
          phone: data.phone,
          ic_number: data.ic_number,
          address: data.address,
          emergency_name: data.emergency_name,
          emergency_phone: data.emergency_phone,
          nutrition_advice: data.nutrition_advice,
          medical_history: data.medical_history,
          shirt_size: data.shirt_size,
          weight: data.weight,
          height: data.height
        };
        resolve(profile);
      } else {
        resolve(this.setProfile())
      }

    });


    });
    
  }

  saveToken(key: any){
    this.storage.set('Token', JSON.stringify(key));
  }

  getToken(): Promise<any>{

    return new Promise(resolve => {
      this.storage.get('Token').then(data => resolve(data));
    })

  }

  setProfile(): any{

    let profile = {
      name: "Ilham Ismail",
      gender: "male",
      DOB: 21312312313,
      phone: "012-2343230",
      ic_number: "890213-12-3234",
      address: "10, Jalan 6/3A, Taman Petaling, 23000 Petaling Jaya, Selangor",
      emergency_name: "Ismail Ali",
      emergency_phone: "018-09088743",
      nutrition_advice: "y",
      medical_history: "NA",
      shirt_size: "L",
      weight: "90",
      height: "179"
    };

    return profile;

  }

}
