import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexEditorComponent } from './complex-editor.component';

describe('ComplexEditorComponent', () => {
  let component: ComplexEditorComponent;
  let fixture: ComponentFixture<ComplexEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
