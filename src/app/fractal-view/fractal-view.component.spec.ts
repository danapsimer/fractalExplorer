import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {FractalViewComponent} from './fractal-view.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromRoot from '../reducers';
import * as fromFractal from '../fractal/fractal.reducer';
import {selectFractalState} from '../fractal/fractal.selectors';
import {MemoizedSelector, Store} from '@ngrx/store';

describe('FractalViewComponent', () => {
  let component: FractalViewComponent;
  let fixture: ComponentFixture<FractalViewComponent>;
  let mockStore: MockStore<fromFractal.State>;
  let mockSelectFractalState: MemoizedSelector<fromRoot.State, fromFractal.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FractalViewComponent],
      providers: [
        provideMockStore({
          initialState: {
            ...fromRoot.initialState,
            fractal: fromFractal.initialState
          }
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockStore = getTestBed().get(Store);
    mockSelectFractalState = mockStore.overrideSelector(selectFractalState, fromFractal.initialState);
    fixture = TestBed.createComponent(FractalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const dummyImageElement = document.createElement('img');
    mockSelectFractalState.setResult({
      ...fromFractal.initialState,
    });
    expect(component).toBeTruthy();
  });

  it('should contain a canvas', () => {
    const canvas = fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
    expect(canvas.textContent.trim()).toBe('Sorry, your browser does not support HTML5 canvas element.');
  });
});
