import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromFractal from './fractal.reducer';
import {State} from './fractal.reducer';

export const selectFractalState = createFeatureSelector<fromFractal.State>(
  fromFractal.fractalFeatureKey
);

export const selectFractalURI = createSelector(
  selectFractalState,
  (state: State) => state.uri
);
