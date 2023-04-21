import * as fromFirestore from '../reducers/firestore.reducer';
import { selectFirestoreState } from './firestore.selectors';

describe('Firestore Selectors', () => {
  it('should select the feature state', () => {
    const result = selectFirestoreState({
      [fromFirestore.firestoreFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
