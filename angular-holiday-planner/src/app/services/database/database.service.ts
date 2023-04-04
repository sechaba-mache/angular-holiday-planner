import {inject, Injectable} from '@angular/core';
import { doc, Firestore, getDoc } from "@angular/fire/firestore";
import { ITrip} from "../../models/trips";
import {from, switchMap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  firestore: Firestore = inject(Firestore);
  constructor() {}

  getUserTripsObs(documentName: string){
    const docRef = doc(this.firestore, "Trips", documentName);

    return from(getDoc(docRef)).pipe(
      switchMap(async (trip) => trip.data()?.['trips'] as ITrip[])
    )
  }

}
