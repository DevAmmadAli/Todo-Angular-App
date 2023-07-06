import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() name: string = '';
  @Input() placeHolder: string = '';
  @Input() inputType: string = 'text';
  @Input() control!: FormControl;

  firstErrorKey: string = '';

  isError() {
    const { touched, dirty, errors } = this.control;
    if (errors) {
      this.firstErrorKey = Object.keys(errors)[0];
    }
    return errors && (touched || dirty);
  }

  getErrorType(errorType: string) {
    return this.control.errors?.[errorType] && this.firstErrorKey == errorType;
  }
}
