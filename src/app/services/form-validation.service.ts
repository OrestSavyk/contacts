import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  isValidEmail(control: AbstractControl): ValidationErrors {
    const currentEmailValue = control.value;

    if (
      !currentEmailValue ||
      /^[\w\+\.\-]+\@(([\w\-])+\.)+[a-z\-]+$/.test(currentEmailValue)
    ) {
      return null as any;
    }

    return { email: true };
  }

  isValidPhone(control: AbstractControl): ValidationErrors {
    const currentPhoneValue = control.value;

    if (
      !currentPhoneValue ||
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        currentPhoneValue
      )
    ) {
      return null as any;
    }

    return { phoneNumber: true };
  }
}
