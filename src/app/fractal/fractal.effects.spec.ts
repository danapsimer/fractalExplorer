import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MemoizedSelector} from '@ngrx/store/src/selector';
import {Action, Store} from '@ngrx/store';
import {getTestScheduler} from 'jasmine-marbles';

import {FractalEffects} from './fractal.effects';
import {selectFractalState} from './fractal.selectors';
import {
  changeC,
  changeCenter,
  changeFractalType,
  changeMaxIter,
  changePrecision,
  changeScale,
  changeUri,
  windowResized,
  zoomIn
} from './fractal.actions';
import * as fromFractal from './fractal.reducer';
import * as fromRoot from '../reducers';
import {TestScheduler} from 'rxjs/testing';

describe('FractalEffects', () => {
  let actions$: Observable<Action>;
  let effects: FractalEffects;
  let mockStore: MockStore<fromFractal.State>;
  let mockSelectFractalState: MemoizedSelector<fromRoot.State, fromFractal.State>;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            ...fromRoot.initialState,
            fractal: fromFractal.initialState
          }
        }),
        {provide: TestScheduler, useFactory: getTestScheduler},
        FractalEffects,
      ]
    });
    mockStore = TestBed.get(Store);
    mockSelectFractalState = mockStore.overrideSelector(selectFractalState, fromFractal.initialState);
    testScheduler = TestBed.get(TestScheduler);
    effects = TestBed.get<FractalEffects>(FractalEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Element Change Actions', () => {

    it('should change uri when C is changed', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          C: {r: -1, i: 0.5},
        });

        actions$ = hot('-a', {
          a: changeC({C: {r: -1, i: 0.5}}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?C=-1%2B0.5i'})
        });
      });
    });

    it('should change uri when center is changed', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          center: {r: -1, i: 0.5},
        });

        actions$ = hot('-a', {
          a: changeCenter({center: {r: -1, i: 0.5}}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?center=-1%2B0.5i'})
        });
      });
    });

    it('should change uri when scale is changed', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          scale: 0.5,
        });

        actions$ = hot('-a', {
          a: changeScale({scale: 0.5}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?s=0.5'})
        });
      });
    });

    it('should change uri when window changes', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          rx: 1024,
          ry: 1024,
        });

        actions$ = hot('-a', {
          a: windowResized({rx: 1024, ry: 1024}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?rx=1024&ry=1024'})
        });
      });
    });
    it('should change uri when maxIter changes', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          maxIter: 100,
        });

        actions$ = hot('-a', {
          a: changeMaxIter({maxIter: 100}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?maxIter=100'})
        });
      });
    });
    it('should change uri when precision changes', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          precision: 100,
        });

        actions$ = hot('-a', {
          a: changePrecision({precision: 100}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/mandelbrot?precision=100'})
        });
      });
    });
    it('should change uri when fractalType is changed', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          fractalType: 'julia',
        });

        actions$ = hot('-a', {
          a: changeFractalType({fractalType: 'julia'}),
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -e', {
          e: changeUri({uri: '/fractal/julia'})
        });
      });
    });

    it('should change uri when scale & center are changed', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          scale: 0.5,
          center: {r: -1, i: 0.5},
          C: {r: -1, i: 0.5},
        });

        actions$ = hot('-a', {
          a: changeCenter({center: {r: -1, i: 0.5}})
        });

        expectObservable(effects.updateFractalUri$).toBe('500ms -z', {
          z: changeUri({uri: '/fractal/mandelbrot?center=-1%2B0.5i&C=-1%2B0.5i&s=0.5'})
        });
      });
    });
  });

  describe('ZoomIn Action', () => {
    it('should change scale and center when zoomIn action is issued', () => {
      testScheduler.run(({hot, expectObservable}) => {
        mockSelectFractalState.setResult({
          ...fromFractal.initialState,
          scale: 5.0,
          center: {r: 0, i: 0},
        });

        actions$ = hot('-a', {
          a: zoomIn({factor: 0.5, x: 160, y: 400})
        });

        expectObservable(effects.zoomIn$).toBe('-(yz)', {
          y: changeScale({scale: 2.5}),
          z: changeCenter({center: {r: -1.25, i: -1.25}}),
        });
      });
    });
  });

});
