import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as FirestoreActions from '../actions/firestore.actions';
import {DatabaseService} from "../../services/database/database.service";
import {AuthService} from "../../services/auth/auth.service";


@Injectable()
export class FirestoreEffects {

  constructor(private actions$: Actions, private database: DatabaseService, private auth: AuthService) {}

  getUserTrips = createEffect(() => {
    return this.actions$.pipe(
      ofType(FirestoreActions.loadFirestores),
      switchMap(() => {
        if(this.auth.user){
          return this.database.getUserTripsObs(this.auth.user.user.uid).pipe(
            map(res => FirestoreActions.loadFirestoresSuccess({trips: res})),
            catchError(err => {
              console.error(err);
              return EMPTY;
            })
          )
        }
        return EMPTY;
      })
    )
  })
}
