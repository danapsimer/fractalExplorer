import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complex-editor',
  template: `
    <mat-form-field>
      <input matInput type="text" />
    </mat-form-field>
  `,
  styles: []
})
export class ComplexEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
