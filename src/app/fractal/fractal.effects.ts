import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {concatMap, debounce, map, take} from 'rxjs/operators';

import * as FractalActions from './fractal.actions';
import {State} from './fractal.reducer';
import {select, Store} from '@ngrx/store';
import {selectFractalState} from './fractal.selectors';
import {HttpParams} from '@angular/common/http';
import {interval} from 'rxjs';


@Injectable()
export class FractalEffects {


  updateFractalUri$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FractalActions.changeCenter,
        FractalActions.changeScale,
        FractalActions.changeC,
        FractalActions.changeFractalType,
        FractalActions.windowResized),
      debounce(() => interval(500)),
      concatMap((action) =>
        this.store.pipe(
          select(selectFractalState),
          take(1),
          map(this.buildUri),
          map(uri => {
            return {uri};
          }),
          map(FractalActions.changeUri)
        )
      )
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
    return '/fractal/' + state.fractalType + (params.keys().length > 0 ? '?' + params.toString() : '');
  }

  constructor(private actions$: Actions, private store: Store<State>) {
  }

}
