import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {catchError, debounceTime, flatMap, map, mergeMap, throttleTime, withLatestFrom} from 'rxjs/operators';
import {from, of} from 'rxjs';

import * as FractalActions from './fractal.actions';
import {changeCenter, changeScale, loadImage, loadImageFailure, loadImageSuccess} from './fractal.actions';
import {State} from './fractal.reducer';
import {selectFractalState, selectFractalURI} from './fractal.selectors';
import {ImageLoaderService} from '../image-loader/image-loader.service';


@Injectable()
export class FractalEffects {

  zoomIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FractalActions.zoomIn),
      throttleTime(2000),
      withLatestFrom(this.store.pipe(select(selectFractalState))),
      map(([action, state]) => {
        const rx = state.rx ? state.rx : 640;
        const ry = state.ry ? state.ry : 480;
        const scale = state.scale ? state.scale : 5.0;
        const center = state.center ? state.center : {r: 0, i: 0};
        const ps = (rx >= ry) ? scale / rx : scale / ry;
        const roffset = ps * (action.x - (rx / 2));
        const ioffset = ps * ((ry - action.y) - (ry / 2));
        return {
          scale: scale * action.factor,
          center: {r: center.r + roffset, i: center.i + ioffset}
        };
      }),
      flatMap(({scale, center}) =>
        from([
          changeScale({scale}),
          changeCenter({center})
        ])
      )
    );
  });

  updateFractalUri$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FractalActions.changeCenter,
        FractalActions.changeScale,
        FractalActions.changeC,
        FractalActions.changeFractalType,
        FractalActions.windowResized,
        FractalActions.changeMaxIter,
        FractalActions.changePrecision),
      debounceTime(500),
      withLatestFrom(this.store.pipe(select(selectFractalState))),
      map(([_, state]) => state),
      map(this.buildUri),
      map(uri => {
        return {uri};
      }),
      map(FractalActions.changeUri)
    );
  });

  loadImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadImage),
      withLatestFrom(this.store.pipe(select(selectFractalURI))),
      mergeMap(([_, uri]) => this.imageLoader.loadImage$(uri)),
      map(img => loadImageSuccess({img})),
      catchError(error => of(loadImageFailure({error})))
    );
  });

  buildUri(state: State): string {
    let params = new HttpParams();
    if (state.center) {
      params = params.append('center', state.center.r + '+' + state.center.i + 'i');
    }
    if (state.C) {
      params = params.append('C', state.C.r + '+' + state.C.i + 'i');
    }
    if (state.scale) {
      params = params.append('s', '' + state.scale);
    }
    if (state.rx) {
      params = params.append('rx', '' + state.rx);
    }
    if (state.ry) {
      params = params.append('ry', '' + state.ry);
    }
    if (state.maxIter) {
      params = params.append('maxIter', '' + state.maxIter);
    }
    if (state.precision) {
      params = params.append('precision', '' + state.precision);
    }
    const query = params.toString().replace(/\+/g, '%2B');

    return '/fractal/' + state.fractalType + (params.keys().length > 0
      ? '?' + query
      : '');
  }


  constructor(private actions$: Actions, private store: Store<State>, private imageLoader: ImageLoaderService) {
  }

}
