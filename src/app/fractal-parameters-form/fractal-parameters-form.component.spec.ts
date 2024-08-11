import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalParametersFormComponent } from './fractal-parameters-form.component';

describe('FractalParametersFormComponent', () => {
  let component: FractalParametersFormComponent;
  let fixture: ComponentFixture<FractalParametersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractalParametersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractalParametersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
