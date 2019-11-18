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
export const windowResized = createAction(
  '[Fractal] Window Resized',
  props<{ rx: number, ry: number}>(),
);
export const changeUri = createAction(
  '[Fractal] Change Uri',
  props<{ uri: string }>(),
);

