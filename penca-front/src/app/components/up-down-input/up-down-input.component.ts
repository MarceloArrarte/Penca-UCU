import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-up-down-input',
  templateUrl: './up-down-input.component.html',
  styleUrls: ['./up-down-input.component.scss']
})
export class UpDownInputComponent implements OnInit {
  @Input('control')
  formControl!: FormControl<number>;

  ngOnInit(): void {
    if (!this.formControl) {
      console.error('formControl no puede ser nulo');
    }
  }

  increment(): void {
    this.formControl.setValue(this.formControl.value + 1);
  }

  decrement(): void {
    this.formControl.setValue(this.formControl.value - 1);
  }
}
