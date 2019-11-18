import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {FractalEffects} from './fractal.effects';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectFractalState} from './fractal.selectors';
import {Action, Store} from '@ngrx/store';
import {changeC, changeCenter, changeFractalType, changeScale, changeUri, windowResized} from './fractal.actions';
import {hot} from 'jasmine-marbles';
import {initialState, State} from './fractal.reducer';
import {MemoizedSelector} from '@ngrx/store/src/selector';

describe('FractalEffects', () => {
  let actions$: Observable<Action>;
  let store: MockStore<State>;
  let effects: FractalEffects;
  let mockSelectFractalState: MemoizedSelector<State,State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FractalEffects,
        provideMockActions(() => actions$),
        provideMockStore({})
      ]
    });
    store = TestBed.get<Store<State>>(Store);
    mockSelectFractalState = store .overrideSelector(selectFractalState, initialState);
    effects = TestBed.get<FractalEffects>(FractalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should change uri when C is changed', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      C: {r: -1, i: 0.5},
    });

    actions$ = hot('-a-', {
      a: changeC({C: {r: -1, i: 0.5}}),
    });

    const expected = hot('-e-', {
      e: changeUri({uri: '/fractal/mandelbrot?C=-1+0.5i'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
  it('should change uri when center is changed', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      center: {r: -1, i: 0.5},
    });

    actions$ = hot('-a-', {
      a: changeCenter({center: {r: -1, i: 0.5}}),
    });

    const expected = hot('-e-', {
      e: changeUri({uri: '/fractal/mandelbrot?center=-1+0.5i'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
  it('should change uri when scale is changed', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      scale: 0.5,
    });

    actions$ = hot('-a-', {
      a: changeScale({scale: 0.5}),
    });

    const expected = hot('-e-', {
      e: changeUri({uri: '/fractal/mandelbrot?s=0.5'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
  it('should change uri when window changes', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      rx: 1024,
      ry: 1024,
    });

    actions$ = hot('-a-', {
      a: windowResized({rx: 1024, ry: 1024}),
    });

    const expected = hot('-e-', {
      e: changeUri({uri: '/fractal/mandelbrot?rx=1024&ry=1024'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
  it('should change uri when fractalType is changed', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      fractalType: 'julia',
    });

    actions$ = hot('-a-', {
      a: changeFractalType({fractalType: 'julia'}),
    });

    const expected = hot('-e-', {
      e: changeUri({uri: '/fractal/julia'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
  it('should change uri when scale & center are changed', () => {
    mockSelectFractalState.setResult({
      ...initialState,
      scale: 0.5,
      center: {r: -1, i: 0.5},
      C: {r: -1, i: 0.5},
    });

    actions$ = hot('-a-', {
      a: changeCenter( {center: {r: -1, i: 0.5}})
    });

    const expected = hot('-z-', {
      z: changeUri({uri: '/fractal/mandelbrot?center=-1+0.5i&C=-1+0.5i&s=0.5'})
    });
    expect(effects.updateFractalUri$).toBeObservable(expected);
  });
});
