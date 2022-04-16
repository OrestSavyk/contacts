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
  @Input() contact: Contact;
  @Input() isEditContact: boolean;

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

  ngOnInit(): void {
    this.formPatchValue();
  }

  formPatchValue() {
    if (this.isEditContact) {
      this.contactForm.patchValue(this.contact);
    }
  }

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
      const newContact = { id: uuid.v4(), ...this.contactForm.value };

      const contacts: Contact[] = [
        ...JSON.parse(localStorage.getItem('contacts')),
      ];

      if (
        !this.isNumberExist(contacts, newContact) &&
        !this.isNameExist(contacts, newContact)
      ) {
        localStorage.clear();

        localStorage.setItem(
          'contacts',
          JSON.stringify([...contacts, newContact])
        );

        this.contactForm.reset();

        this.router.navigate(['']);
      } else if (this.isNameExist(contacts, newContact)) {
        alert('This Contact Name is exist');
      } else if (this.isNumberExist(contacts, newContact)) {
        alert('This Phone Number is exist');
      }
    }
  }

  editContact() {
    if (this.contactForm.valid) {
      const editedContact = { id: this.contact.id, ...this.contactForm.value };

      const contacts: Contact[] = [
        ...JSON.parse(localStorage.getItem('contacts')),
      ];

      const contactsWithoutEditedContact = contacts.filter(
        (item) => item.id !== editedContact.id
      );

      if (
        !this.isNumberExist(contactsWithoutEditedContact, editedContact) &&
        !this.isNameExist(contactsWithoutEditedContact, editedContact)
      ) {
        localStorage.clear();

        localStorage.setItem(
          'contacts',
          JSON.stringify([...contacts, editedContact])
        );

        this.contactForm.reset();

        this.router.navigate(['']);
      } else if (this.isNameExist(contacts, editedContact)) {
        alert('This Contact Name is exist');
      } else if (this.isNumberExist(contacts, editedContact)) {
        alert('This Phone Number is exist');
      }
    }
  }

  isNameExist(contacts: Contact[], contact: Contact) {
    const nameSelectedContact = contact.firstName + contact.lastName;

    return contacts.some((res) => {
      let nameAllContacts = res.firstName + res.lastName;

      return nameAllContacts
        .replace(/\s+/g, '')

        .trim()

        .toLowerCase()

        .match(nameSelectedContact.replace(/\s+/g, '').trim().toLowerCase());
    });
  }

  isNumberExist(contacts: Contact[], contact: Contact) {
    return contacts.some(
      (item: Contact) => item.phoneNumber === contact.phoneNumber
    );
  }

  showErrors(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);

    return field.touched && field.invalid;
  }

  getError(field: string): ValidationErrors {
    return this.contactForm.get(field).errors;
  }
}
