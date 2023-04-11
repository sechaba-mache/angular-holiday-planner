import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFirestore from '../reducers/firestore.reducer';

export const selectFirestoreState = createFeatureSelector<fromFirestore.State>(
  fromFirestore.firestoreFeatureKey
);

export const selectUserTrips = createSelector(
  selectFirestoreState,
  (state) => state.trips
)
