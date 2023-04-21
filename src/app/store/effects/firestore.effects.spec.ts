import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FirestoreEffects } from './firestore.effects';

describe('FirestoreEffects', () => {
  let actions$: Observable<any>;
  let effects: FirestoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FirestoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
