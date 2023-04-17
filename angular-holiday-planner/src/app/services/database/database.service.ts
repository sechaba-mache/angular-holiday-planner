import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, updateDoc } from "@angular/fire/firestore";
import { IActivity, ITrip } from "../../models/trips";
import { from, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectUserTrips } from "../../store/selectors/firestore.selectors";
import {IActivityForm, ITripForm} from "../../models/forms";
import {loadFirestores} from "../../store/actions/firestore.actions";
import {CurrencyConversionService} from "../conversion/currency-conversion.service";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  firestore: Firestore = inject(Firestore);
  constructor(private store: Store, private currencyConverter: CurrencyConversionService) { }

  getUserTripsObs(documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);

    return from(getDoc(docRef)).pipe(
      switchMap(async (trip) => {
        const newTrips = trip.data()?.['trips'] as ITrip[];
        newTrips.map(trip => {
          trip.tripCost = this.currencyConverter.convert(trip).toFixed(2)
        })
        return newTrips
      })
    )
  }

  deleteTripActivity(tripIndex: number, activityIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = [...res]);
    if(currentTrips){
      const newTrips = currentTrips.map((trip, index) => {
        if(index === tripIndex) {
          return {...trip, itinerary:
              {...trip.itinerary, activities:
                  [...trip.itinerary.activities.slice(0, activityIndex), ...trip.itinerary.activities.slice(activityIndex + 1, trip.itinerary.activities.length)]
              }
          }
        }
        return trip;
      })

      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
  }


  upsertTripActivity(form: IActivityForm, tripIndex: number, activityIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = [...res]);
    if (currentTrips) {

      const newTrips = currentTrips.map((trip, index) => {
        if (index === tripIndex) {
          return {
            ...trip, itinerary:
            {
              ...trip.itinerary, activities:
                trip.itinerary.activities.map((activity, innerIndex) => {
                  if (innerIndex === activityIndex) {
                    return form as IActivity
                  }
                  return activity
                })
            }
          }
        }
        return trip
      })

      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
  }

  addTrip(trip: ITrip, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if (currentTrips) {
      trip.tripID = String(currentTrips.length + 1)
      const newTrips: ITrip[] = [...currentTrips, trip];
      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
    else {
      trip.tripID = String(0)
      setDoc(docRef, { trips: [trip] }).then(() => this.store.dispatch(loadFirestores()));
    }
  }

  addActivity(event: IActivityForm, tripIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if (currentTrips) {
      const newTrips = currentTrips.map((trip, index) => {
        if(index === tripIndex) {
          return {...trip, itinerary: {...trip.itinerary, activities: [...trip.itinerary.activities, event]}}
        }
        return trip;
      })

      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
  }

  deleteTrip(tripIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if(currentTrips){
      const newTrips = [...currentTrips.slice(0, tripIndex), ...currentTrips.slice(tripIndex + 1, currentTrips.length)]
      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
  }

  updateTrip(event: ITripForm, tripIndex: number, documentName: string) {
    const docRef = doc(this.firestore, "Trips", documentName);
    let currentTrips: ITrip[] | undefined;
    this.store.select(selectUserTrips).subscribe(res => currentTrips = res);
    if(currentTrips) {
      const newTrips = currentTrips.map((trip, index) => {
        if(index === tripIndex){
          return {...trip,
            tripName: event.tripName,
            description: event.description,
            itinerary: {
              ...trip.itinerary,
              itineraryName: event.itineraryName,
              description: event.itineraryDescription
            }
          }
        }
        return trip;
      })

      updateDoc(docRef, "trips", newTrips).then(() => this.store.dispatch(loadFirestores()));
    }
  }
}
