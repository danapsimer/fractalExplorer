import {NgModule} from '@angular/core';
import {MatFormFieldModule, MatInputModule, MatSliderModule} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ]
})
export class MaterialModule {
}
