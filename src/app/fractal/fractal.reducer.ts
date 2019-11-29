import {Action, createReducer, on} from '@ngrx/store';
import * as FractalActions from './fractal.actions';
import {Complex} from '../model/complex';

export const fractalFeatureKey = 'fractal';

export type FractalType = 'mandelbrot' | 'julia';

export interface State {
  center?: Complex;
  C?: Complex;
  scale?: number;
  rx?: number;
  ry?: number;
  maxIter?: number;
  precision?: number;
  fractalType: FractalType;
  uri: string;
  imageLoading: boolean;
  imageLoadingError?: any;
  img?: HTMLImageElement;
}

export const initialState: State = {
  fractalType: 'mandelbrot',
  uri: '/fractal/mandelbrot',
  imageLoading: false,
};

const fractalReducer = createReducer(
  initialState,

  on(FractalActions.windowResized, (state, action) => {
    return {...state, rx: action.rx, ry: action.ry};
  }),
  on(FractalActions.changeCenter, (state, action) => {
    return {...state, center: action.center};
  }),
  on(FractalActions.changeC, (state, action) => {
    return {...state, C: action.C};
  }),
  on(FractalActions.changeScale, (state, action) => {
    return {...state, scale: action.scale};
  }),
  on(FractalActions.changeMaxIter, (state, action) => {
    return {...state, maxIter: action.maxIter};
  }),
  on(FractalActions.changePrecision, (state, action) => {
    return {...state, precision: action.precision};
  }),
  on(FractalActions.changeFractalType, (state, action) => {
    return {...state, fractalType: action.fractalType};
  }),
  on(FractalActions.changeUri, (state, action) => {
    return {...state, uri: action.uri};
  }),
  on(FractalActions.zoomIn, (state) => {
    return state;
  }),
  on(FractalActions.loadImage, (state) => {
    return {...state, imageLoading: true};
  }),
  on(FractalActions.loadImageSuccess, (state, action) => {
    return {...state, imageLoading: false, img: action.img};
  }),
  on(FractalActions.loadImageFailure, (state, action) => {
    return {...state, imageLoading: false, imageLoadingError: action.error};
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return fractalReducer(state, action);
}
