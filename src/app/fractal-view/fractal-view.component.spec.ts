import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalViewComponent } from './fractal-view.component';

describe('FractalViewComponent', () => {
  let component: FractalViewComponent;
  let fixture: ComponentFixture<FractalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
