import { createAction, props } from '@ngrx/store';
import {IActivity, ITrip} from "../../models/trips";

export const loadFirestores = createAction(
  '[Firestore] Load Firestores'
);

export const loadFirestoresSuccess = createAction(
  '[Firestore] Load Firestores Success',
  props<{ trips: ITrip[] }>()
);

export const loadFirestoresFailure = createAction(
  '[Firestore] Load Firestores Failure',
  props<{ error: unknown }>()
);

export const setActivities = createAction(
  '[Firestore] Load Firestores Success',
  props<{ activities: IActivity[] }>()
);
