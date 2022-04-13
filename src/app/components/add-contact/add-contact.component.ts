import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { FormValidationService } from 'src/app/services/form-validation.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent {
  contactForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormValidationService,
    private router: Router
  ) {
    this.devCartForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentYear - 1, 0, 0);
  }
  private devCartForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]),
      ],
      lastName: ['', [Validators.maxLength(15)]],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(100000000),
          Validators.max(10000000000000000),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.maxLength(30),
          this.formService.isValidEmail,
        ]),
      ],
      address: ['', Validators.maxLength(30)],
      birth: [],
    });
  }
  addContact() {
    if (this.contactForm.valid) {
      const contacts: Contact[] = [
        ...JSON.parse(localStorage.getItem('contacts')),
      ];
      if (
        !contacts.some(
          (item) => item.phoneNumber == this.contactForm.value.phoneNumber
        )
      ) {
        const newContact = { id: uuid.v4(), ...this.contactForm.value };
        localStorage.clear();
        localStorage.setItem(
          'contacts',
          JSON.stringify([...contacts, newContact])
        );
        this.contactForm.reset();
        this.router.navigate(['']);
      }
    }
  }

  showErrors(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field.touched && field.invalid;
  }

  getError(field: string): ValidationErrors {
    return this.contactForm.get(field).errors;
  }
}
