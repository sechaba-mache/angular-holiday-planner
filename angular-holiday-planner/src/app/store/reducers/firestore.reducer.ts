import { createFeature, createReducer, on } from '@ngrx/store';
import * as FirestoreActions from '../actions/firestore.actions';
import {IActivity, ITrip} from "../../models/trips";

export const firestoreFeatureKey = 'firestore';

export interface State {
  trips: ITrip[],
  activities: IActivity[]
}

export const initialState: State = {
  activities: [],
  trips: []
};

export const reducer = createReducer(
  initialState,
  on(FirestoreActions.loadFirestoresSuccess, (state, {trips}) => ({...state, trips})),
  on(FirestoreActions.setActivities, (state, {activities}) => ({...state, activities})),

);

export const firestoreFeature = createFeature({
  name: firestoreFeatureKey,
  reducer,
});

