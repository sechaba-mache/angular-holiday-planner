import { Injectable } from '@angular/core';
import {ITrip} from "../../models/trips";
// @ts-ignore
import CurrencyAPI from "@everapi/currencyapi-js"
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  exchangeRates: {[key: string]: {code: string, value: number}} | undefined;
  currencyApi: CurrencyAPI | undefined
  converstionTo = "ZAR"
  constructor() {
    this.currencyApi = new CurrencyAPI(environment.currencyAPIKey);
  }

  convert(trip: ITrip) {
    if(this.currencyApi){
      return this.currencyApi.latest({
        base_currency: this.converstionTo
      }).then((res: { data: {[key: string]: {code: string, value: number}}; }) => {
        this.exchangeRates = res.data
        let cost = 0;
        trip.itinerary.activities.map(activity => {
          if(this.exchangeRates) cost += (activity.cost * (Number(this.exchangeRates?.[`${activity.currency}`].code)))
          console.log(cost)
        })
      })
    }
    return null;
  }
}
