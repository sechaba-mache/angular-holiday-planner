import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITrip } from "../../models/trips";
import { ICurrency, Data } from "../../models/currencies";
import CurrencyAPI from '@everapi/currencyapi-js';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {

  currencyApi = new CurrencyAPI(environment.currencyAPIKey);
  conversionTo = "ZAR";
  exchangeRates: ICurrency | undefined
  constructor() {
    this.currencyApi.latest({ base_currency: this.conversionTo }).then((res: ICurrency) => this.exchangeRates = res)
  }

  convert(trip: ITrip) {
    let cost = 0;

    if (this.exchangeRates) {
      trip.itinerary.activities.map(activity => {
        if (this.exchangeRates)
          cost += (activity.cost / this.exchangeRates.data[activity.currency as keyof Data].value)
      })

      return cost;
    }

    return 0;
  }

}
