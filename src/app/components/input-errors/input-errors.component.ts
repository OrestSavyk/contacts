import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const FieldErrors = {
  firstName: {
    required: 'Please enter your first name.',
    minlength: 'First Name must have 3 characters minimum.',
  },

  lastName: {
    required: 'Please enter your last name.',
    minlength: 'Second Name must have maximum 15 characters.',
  },

  phoneNumber: {
    required: 'Phone number is required.',
    minlength: 'Please enter a valid phone number.',
  },

  email: {
    required: 'Email is required.',
    email: 'Please enter a valid email address.',
  },

  address: {
    required: 'Address is required.',
    email: 'Address must have maximum 30 characters.',
  },
};
@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
})
export class InputErrorsComponent implements OnChanges {
  @Input() showErrors: boolean;

  @Input() fieldErrors: ValidationErrors;

  @Input() errorMappingKey: string;

  errorText: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fieldErrors) {
      this.defineErrorMsg(this.fieldErrors);
    }
  }

  private defineErrorMsg(err: ValidationErrors): void {
    if (!err) {
      return;
    }

    const fieldErr = Object.keys(err)[0];

    this.errorText = this.errorMappingKey
      ? FieldErrors[this.errorMappingKey][fieldErr]
      : FieldErrors[fieldErr];
  }
}
