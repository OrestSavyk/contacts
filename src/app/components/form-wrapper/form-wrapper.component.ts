import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
})
export class FormWrapperComponent implements OnInit {
  @Input() isAdd: boolean;
  @Input() contact: Contact;
  contactForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormValidationService,
    private router: Router
  ) {
    this.devContactForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 0);
    this.maxDate = new Date(currentYear - 1, 0, 0);
  }
  ngOnInit(): void {}
  private devContactForm(): void {
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
      email: ['', this.formService.isValidEmail],
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
  editContact() {
    if (this.contactForm.valid) {
      const editedContact = { ...this.contactForm.value };
      const contacts: Contact[] = [
        ...JSON.parse(localStorage.getItem('contacts')),
      ];
      localStorage.clear();
      localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, editedContact])
      );
      this.contactForm.reset();
      this.router.navigate(['']);
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
