import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookingProvider {

	country: Array<any>;
	studios: Array<any>;

  constructor(public http: Http) {
    //console.log('Hello BookingProvider Provider');
    this.country = ["Malaysia", "China"];
    this.studios = [{country: "Malaysia", studio: [{name: "Bangsar South"}, {name: "KL Sentral"}, {name: "PJ"}]}, {country: "China", studio: [{name: "Beijing"}, {name: "Shanghai"}, {name: "Guangzhou"}]}]
  }

  getStudioList(country: string): Array<any>{
    //console.log(this.studios[0].studio);

    let index = this.studios.findIndex(studios => studios.country == country);

    return this.studios[index].studio;
  }

}
