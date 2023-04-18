import { createFeature, createReducer, on } from '@ngrx/store';
import * as FirestoreActions from '../actions/firestore.actions';
import {ITrip} from "../../models/trips";

export const firestoreFeatureKey = 'firestore';

export interface State {
  trips: ITrip[],
  costs: number[]
}

export const initialState: State = {
  costs: [],
  trips: []
};

export const reducer = createReducer(
  initialState,
  on(FirestoreActions.loadFirestoresSuccess, (state, {trips}) => ({...state, trips})),
  );

export const firestoreFeature = createFeature({
  name: firestoreFeatureKey,
  reducer,
});

