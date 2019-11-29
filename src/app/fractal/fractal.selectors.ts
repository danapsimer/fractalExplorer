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

export const selectFractalImage = createSelector(selectFractalState, (state: State) => state.img);
export const selectFractalImageLoading = createSelector(selectFractalState, (state: State) => state.imageLoading);
export const selectFractalImageLoadingError = createSelector(selectFractalState, (state: State) => state.imageLoadingError);
