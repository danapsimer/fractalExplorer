import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Complex} from '../model/complex';

@Component({
  selector: 'app-fractal-parameters-form',
  template: `
    <form [formGroup]="fractalParametersForm">
      <mat-label>Zoom Factor</mat-label>
      <mat-slider matInput min="5" max="100" step="5" thumbLabel formControlName="zoomFactor"></mat-slider>
      <mat-label>Precision</mat-label>
      <mat-slider matInput min="50" max="1000" step="50" thumbLabel formControlName="precision"></mat-slider>
      <mat-label>Max Iterations</mat-label>
      <mat-slider matInput min="50" max="500" step="20" thumbLabel formControlName="maxIterations"></mat-slider>
      <mat-form-field>
        <mat-label>Scale</mat-label>
        <input matInput type="text" formControlName="scale"/>
      </mat-form-field>
    </form>
  `,
  styles: [`
    form {
      width: 100%;
    }
    mat-slider {
      width: 100px;
    }
  `]
})
export class FractalParametersFormComponent implements OnInit {

  fractalParametersForm = new FormGroup({
    zoomFactory: new FormControl(50),
    precision: new FormControl(128),
    scale: new FormControl(5),
    maxIterations: new FormControl(50),
    // center: new FormControl({r: 0, i: 0} as Complex),
    // C: new FormControl({r: 0, i: 0} as Complex),
    // fractalType: new FormControl('mandelbrot'),
  });

  constructor() {
  }

  ngOnInit() {
  }

}
