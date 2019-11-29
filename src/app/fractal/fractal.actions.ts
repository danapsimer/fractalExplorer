import {createAction, props} from '@ngrx/store';
import {Complex} from '../model/complex';
import {FractalType} from './fractal.reducer';

export const changeCenter = createAction(
  '[Fractal] Change Center',
  props<{ center: Complex }>(),
);
export const changeScale = createAction(
  '[Fractal] Change Scale',
  props<{ scale: number }>(),
);
export const changeFractalType = createAction(
  '[Fractal] Change Fractal Type',
  props<{ fractalType: FractalType }>(),
);
export const changeC = createAction(
  '[Fractal] Change C',
  props<{ C: Complex }>(),
);
export const changeMaxIter = createAction(
  '[Fractal] Change Max Iterations',
  props<{ maxIter: number }>(),
);
export const changePrecision = createAction(
  '[Fractal] Change Precision',
  props<{ precision: number }>(),
);
export const windowResized = createAction(
  '[Fractal] Window Resized',
  props<{ rx: number, ry: number }>(),
);
export const changeUri = createAction(
  '[Fractal] Change Uri',
  props<{ uri: string }>(),
);
export const zoomIn = createAction(
  '[Fractal] Zoom In',
  props<{ factor: number, x: number, y: number }>(),
);
export const loadImage = createAction(
  '[Fractal] Load Image'
);
export const loadImageSuccess = createAction(
  '[Fractal] Load Image Success',
  props<{ img: HTMLImageElement }>(),
);
export const loadImageFailure = createAction(
  '[Fractal] Load Image Failure',
  props<{ error: any }>(),
);
