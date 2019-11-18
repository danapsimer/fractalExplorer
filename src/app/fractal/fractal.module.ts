import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromFractal from './fractal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FractalEffects } from './fractal.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromFractal.fractalFeatureKey, fromFractal.reducer),
    EffectsModule.forFeature([FractalEffects])
  ]
})
export class FractalModule { }
